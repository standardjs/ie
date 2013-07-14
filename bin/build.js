
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
    var scripts = getScriptsFromDirectory().join(" ")
    exec("java -jar compiler.jar --js "+scripts+" --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file ../build/ie-min.js" ,
      function(err,stdout,stderr){
          console.log(arguments)
      });
     exec("java -jar compiler.jar --js "+scripts+" --js_output_file ../build/ie-min-debug.js" ,
      function(err,stdout,stderr){
          console.log(arguments)
      });
      exec("java -jar compiler.jar --js "+scripts+" --compilation_level WHITESPACE_ONLY  --formatting PRETTY_PRINT --js_output_file ../build/ie-min-dev.js" ,
      function(err,stdout,stderr){
          console.log(arguments)
      });
      exec("jsdoc "+scripts+" -d ../doc")

     
