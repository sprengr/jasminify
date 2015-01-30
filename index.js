var jasmineRequire = require('./jasmine-html.js'); 

function boot(testEnvironment, getContainer) {
      var jasmine = jasmineRequire.core(jasmineRequire);
      jasmineRequire.html(jasmine);
      var env = jasmine.getEnv();

      var jasmineInterface = jasmineRequire.interface(jasmine, env);
      extend(testEnvironment, jasmineInterface);
     
      var queryString = new jasmine.QueryString({
        getWindowLocation: function() { return window.location; }
      });

      var catchingExceptions = queryString.getParam("catch");
      env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);
      
      env.addReporter(jasmineInterface.jsApiReporter);

      var specFilter = new jasmine.HtmlSpecFilter({
        filterString: function() { return queryString.getParam("spec"); }
      });

      env.specFilter = function(spec) {
        return specFilter.matches(spec.getFullName());
      };

      var htmlReporter = new jasmine.HtmlReporter({
        env: env,
        onRaiseExceptionsClick: function() { queryString.setParam("catch", !env.catchingExceptions()); },
        getContainer:  getContainer, 
        createElement: function() { return document.createElement.apply(document, arguments); },
        createTextNode: function() { return document.createTextNode.apply(document, arguments); },
        timer: new jasmine.Timer()
      });
      env.addReporter(htmlReporter)
      htmlReporter.initialize();
      return jasmine;
 }

  function extend(destination, source) {
    for (var property in source) {
            destination[property] = source[property];
    }
    return destination;
  }
  
  module.exports = boot;