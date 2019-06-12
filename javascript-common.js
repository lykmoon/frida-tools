//1、数组转16进制显示
function Bytes2HexString(arrBytes) {
              var str = "";
              for (var i = 0; i < arrBytes.length; i++) {
                var tmp;
                var num=arrBytes[i];
                if (num < 0) {
                 
                  tmp =(255+num+1).toString(16);
                } else {
                  tmp = num.toString(16);
                }
                if (tmp.length == 1) {
                  tmp = "0" + tmp;
                }
                str += tmp;
              }
              return str;
        }
        
      
//2、数组转字符串
function bin2String(array) {
            return String.fromCharCode.apply(String, array);
          }
