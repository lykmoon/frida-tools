    // overload 是用于定位hook哪一个方法的

    .overload()
    .overload('java.lang.String')
    .overload('android.app.Activity')
    .overload('int')
    .overload('[B') // byte array
    .overload('float')
    .overload('android.content.Context')
    .overload('[C')
    .overload('android.content.Context', 'android.view.View')
    .overload('android.app.Activity', 'com.cherrypicks.hsbcpayme.model.object.PayMeNotification')
    .overload('android.content.Context', 'boolean')
    .overload('android.content.Context', 'int')
    .overload('android.content.Context', 'java.lang.String')
    .overload('android.app.Activity', 'int')
    .overload('java.lang.String', 'java.lang.String')
    .overload('android.content.Context', 'android.graphics.Bitmap')
    .overload('java.lang.String', 'java.io.File')
    .overload('android.content.Context', 'java.lang.String', 'java.util.List')
    .overload('java.lang.String', 'java.lang.String', 'java.lang.String')
    .overload('java.lang.String', '[B', '[B')
    .overload('java.lang.String', 'java.lang.String', 'android.content.Context')
    .overload('android.app.Activity', 'com.cherrypicks.hsbcpayme.model.object.PayMeNotification', 'int')
    .overload('[B', '[B', '[B')
    .overload('android.content.Context', 'java.lang.String', 'java.lang.String')
    .overload('android.app.Activity', 'int', 'int', 'int', 'boolean')


// 一个列子
Java.perform(function () { 
    var AssetManager = Java.use("android.content.res.AssetManager");
    var FileInputStream = Java.use("java.io.FileInputStream");
    AssetManager.open.overload("java.lang.String").implementation = function(str) {
        send("hook asset")
        if(str.endsWith(".xxx")){
            return FileInputStream.$new("/data/local/tmp/xxxxx");
        }
        return this.open(str)
    }
});