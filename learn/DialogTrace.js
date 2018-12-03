// frida -U -l vechain.js -f com.vechain.thorwallet --no-pause

Java.perform(function () {                                      
   var thread = Java.use('java.lang.Thread');
   var instance = thread.$new();

   var Debug = Java.use('android.os.Debug');
   var Log = Java.use('android.util.Log');

   function where(stack){
   	var at = ""
   	for (var i = 0; i < stack.length; i++){
   		at += stack[i].toString() + "\n";
   	}

   	return at;
   }

   function showTrack(){
      var stack = instance.currentThread().getStackTrace();
         var full_call_stack = where(stack);

         console.log(full_call_stack);
   }

   // var Resources = Java.use('android.content.res.Resources');
   // Resources.getString.overload('int').implementation = function(id){
   //    console.log("Resources id:"+ id);
   //    showTrack();
   //    return this.getString(id);
   // };

   // var Builder = Java.use('android.app.AlertDialog$Builder');
   // Builder.setMessage.overload('int').implementation = function(id){
   //    console.log("Resources id:"+ id);
   //    showTrack();
   //    return this.setMessage(id);
   // };

   var Resources = Java.use('android.content.res.Resources');
   Resources.getText.overload('int').implementation = function(id){
      console.log("Resources id:"+ id);
      showTrack();
      return this.getText(id);
   };
   
   

});   


// logcat -s AndroidRuntime
