// frida -U -l adc.js -f com.joom --no-pause

function hookopen(){
	var openPtr = Module.findExportByName("libcrypt-lib.so", ".open");
	console.log("openPtr:",JSON.stringify(openPtr));
}

function hookfopen(){
	var crypt = Process.findModuleByName("libcrypt-lib.so");
	console.log("crypt:",JSON.stringify(crypt));
	var baseStr = crypt.base+"";
	baseStr = baseStr.substring(2);
	var baseAddr = parseInt(baseStr,16);
	var fopenAddr = baseAddr + 293520;
	var target = new NativePointer("0x"+fopenAddr.toString(16));
	console.log(JSON.stringify(target));

	var fopen = new NativeFunction(target,'pointer',['pointer','pointer']);
	Interceptor.replace(target,new NativeCallback(function(path,flags){
			var pathStr = Memory.readUtf8String(path);
			console.log("path:" + pathStr);

			return fopen(path,flags);

		}),'pointer',['pointer','pointer']
		);

	// Interceptor.attach(target,{
	// 	onEnter: function(args) {
	// 		var path = Memory.readCString(args[0]);
	// 		console.log("path:"+path);
	//     },
	//     onLeave:function(retval){
	  		
	//   	}
	// });

	

	// var fopenPtr = Module.findExportByName("libcrypt-lib.so", ".fopen");

	// console.log("fopenPtr:",JSON.stringify(fopenPtr));
}



var openFile = new File("/sdcard/openFile.txt","a+");
function hookOpen(){
	var openPtr = Module.findExportByName("libc.so", "open");
	var open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);
	Interceptor.replace(openPtr, new NativeCallback(function (pathPtr, flags) {
    var path = Memory.readUtf8String(pathPtr);

    var fd = open(pathPtr, flags);
    // console.log("Got fd: " + fd);

    var trace = Thread.backtrace(this.context,Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n");
    if (trace.indexOf("libcrypt-lib.so") > 0){
    	console.log("trace:"+trace);
    	console.log("Opening '" + path + "'");

    	openFile.write(path+"\n");
    	openFile.flush();
	}

    return fd;
}, 'int', ['pointer', 'int']));
}


function hookFopen(){
	var target = Module.findExportByName(null, 'fopen');
	Interceptor.attach(target,{
		onEnter: function(args) {
		var trace = Thread.backtrace(this.context,Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n");
	    if (trace.indexOf("libcrypt-lib.so") > 0){
	    	console.log("trace:"+trace);
	    	var path = Memory.readCString(args[0]);
			console.log("file path:"+path);

	    	openFile.write(path+"\n");
	    	openFile.flush();
		}
			
	    },
	    onLeave:function(retval){
	  		
	  	}
	});
}


var libc=Module.findExportByName(null,"dlopen");
var find = 0;
Interceptor.attach(libc,{
		
		onEnter: function(args) {

			// hookOpen();

			var addr = args[0];
			var str = Memory.readCString(addr);
	        // console.log("dlopen ",str);
	        if (str.indexOf("libcrypt-lib.so") > 0){
	        	find = 1;
	        }else{
	        	find = 0;
	        }
	    },
	    onLeave:function(retval){
	    	if (find > 0){	    	
	    		hookOpen();
	    		hookFopen();
	    	}
	    }
});