Java.perform(function () {                                      
   
   var ConnectionErrorMessages = Java.use("com.google.android.gms.common.internal.ConnectionErrorMessages");
   ConnectionErrorMessages.getErrorMessage.overload('android.content.Context','int').implementation = function(mContext,mI){

   		console.log("gms i:"+ mI);

   		var ret = this.getErrorMessage(mContext,mI);
   		
   		console.log("return:" + ret);

   		var Exception = Java.use("Java.lang.Exception");
   		throw Exception.$new("getErrorMessage");

   		return ret;
   };
});   


// logcat -s AndroidRuntime
