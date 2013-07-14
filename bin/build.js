
var exec = require('child_process').exec,
    fileSystem  = require("fs"),
    closurePath = 'compiler.jar',
    srcPath = '../src/',
    getAvailableScriptConfigFromDirectory = function (path) {
      path = path || srcPath;
      var json = [];
      fileSystem.readdirSync(path).forEach(function (filename) {
          if (/\.json$/.test(filename)) {
            json.push(srcPath+filename)
          }
      })
      return json;
    };
    getAvailableScriptConfigFromDirectory().forEach( function(configPath) {
      var config = require(configPath),
          output = config.output,
          filepaths = [];
      config.files.forEach(function (file) {
        filepaths.push(srcPath+file)
      })
      build(config.output,filepaths.join(" "));

    })
    function build(output,files) {
      //console.log(files)
     //exec("java -jar compiler.jar --js "+files+" --define=DEBUG=false --js_output_file ../build/min/"+output+".js")
   // exec("java -jar compiler.jar --js "+files+" --js_output_file ../build/debug/"+output+".js")
     // exec("java -jar compiler.jar --js "+files+" --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT --js_output_file ../build/dev/"+output+".js")
     exec("uglifyjs "+files+" -o ../build/min/"+output+".js -s -d DEBUG=false -m -c dead_code=true")
     exec("uglifyjs "+files+" -o ../build/debug-min/"+output+".js -s -d DEBUG=true")
     exec("uglifyjs "+files+" -o ../build/dev/"+output+".js -b -d DEBUG=true --comments all");
     exec("jsdoc "+files+" -d ../doc")
    }

