//modified version of https://github.com/bkeepers/lucid/blob/master/spec/javascripts/z_jshint_spec.js

describe('JSHint', function () {
  var options = {curly: true, white: true},
      files = /^\.\.\/src\/js\/.*\.js$/;

  function get(path) {
    path+='?'+new Date().getTime()

    var xhr;
    try {
      xhr = new jasmine.XmlHttpRequest();
      xhr.open("GET", path, false);
      xhr.send(null);
    } catch (e) {
      throw new Error("couldn't fetch " + path + ": " + e);
    }
    if (xhr.status!=0) {
      if (xhr.status < 200 || xhr.status > 299) {
        throw new Error("Could not load '" + path + "'.");
      }
    }

    return xhr.responseText;
  }

  var scripts = document.getElementsByTagName('script');
  for (var i=0;i<scripts.length;i++) {
    hintIt(scripts[i])
  }

  function hintIt(element) {
    var script = element.getAttribute('src');
    if (!files.test(script)) {
      return;
    }

    it(script, function () {
      var self = this;
      var source = get(script);
      var result = JSHINT(source, options);
      for (var i=0;i<JSHINT.errors.length;i++) {
        error(JSHINT.errors[i])
      }
      function error (error) {
        self.addMatcherResult(new jasmine.ExpectationResult({
          passed: false,
          message: "line " + error.line + ' - ' + error.reason + ' - ' + error.evidence
        }));
      }
      expect(true).toBe(true); // force spec to show up if there are no errors
    });

  }
});