//frida -U -p 6324 -l classes.js
Java.perform(() => {
  const groups = Java.enumerateMethods('*!*')
  var file = new File('/sdcard/mobile.txt','wb+')
  var str = JSON.stringify(groups, null, 2)
  console.log(str);
  file.write(str)
  file.flush()
  file.close()
});
