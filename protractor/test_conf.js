let SpecReporter = require('jasmine-spec-reporter').SpecReporter

exports.config = {
  
  framework: 'jasmine2',
 
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
 
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  },
 
  // Tests (spec files) to be run
  specs: ['./specs/*_spec.js'],
 
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    print: function () {},
    showColors: true // Use colors in the command line report.
  },

  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: false
      }
    }))
  }
}