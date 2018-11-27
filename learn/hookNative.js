// frida -U -l adc.js -f com.joom --no-pause

function hookopen(){
	var openPtr = Module.findExportByName("libcrypt-lib.so", ".open");
	console.log("openPtr:",JSON.stringify(openPtr));
}

function hookfopen(){
	var fopenPtr = Module.findExportByName("libcrypt-lib.so", ".fopen");
	console.log("fopenPtr:",JSON.stringify(fopenPtr));
}


function hookOpen(){
	var openPtr = Module.findExportByName("libc.so", "open");
	var open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);
	Interceptor.replace(openPtr, new NativeCallback(function (pathPtr, flags) {
    var path = Memory.readUtf8String(pathPtr);
    console.log("Opening '" + path + "'");
    var fd = open(pathPtr, flags);
    console.log("Got fd: " + fd);
    return fd;
}, 'int', ['pointer', 'int']));
}


var libc=Module.findExportByName(null,"dlopen");
var find = 0;
Interceptor.attach(libc,{
		
		onEnter: function(args) {

			hookOpen();

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

	    	}
	    }
});