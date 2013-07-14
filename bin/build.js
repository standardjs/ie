
var exec = require('child_process').exec,
    fileSystem  = require("fs"),
    closurePath = 'compiler.jar',
    srcPath = '../src/js/',
    getScriptsFromDirectory = function (path) {
      path = path || srcPath;
      var files = fileSystem.readdirSync(path),
          scripts = [];
      for (var i=0;i<files.length;i++) {
          if (/\.js$/.test(files[i])) {
            scripts.push(srcPath+files[i])
          }
      }
      return scripts;
    };
    exec("java -jar compiler.jar --js "+getScriptsFromDirectory().join(" ")+" --define=DEBUG=false --js_output_file ../build/ie-min.js" ,
      function(err,stdout,stderr){
          console.log(arguments)
      });
     exec("java -jar compiler.jar --js "+getScriptsFromDirectory().join(" ")+" --js_output_file ../build/ie-min-debug.js" ,
      function(err,stdout,stderr){
          console.log(arguments)
      });
