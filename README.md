# jasminify
Use jasmine with browserify

* you can require it
* it doesn't pollute the global context (unless you want it to)

##usage es5
```javascript
var jasminify = require('jasminify');
var context = window; //enables your tests to just use describe(), it(), ... without an object prefix (e.g. test.describe(), ..)
var getResultContainer = function() { return document.getElementById('testContainer'); }; //results get written into testContainer
var jasmine = jasminify(context, getResultContainer);
var environment = jasmine.getEnv();
//do stuff, for example load test code dynamically
environment.execute();
```
##usage es6
```javascript
import jasminify from 'jasminify'
let context = window; //enables your tests to just use describe(), it(), ... without an object prefix (e.g. test.describe(), ..)
let getResultContainer = () => document.getElementById('testContainer'); //results get written into testContainer
let jasmine = jasminify(context, getResultContainer);
let environment = jasmine.getEnv();
//do stuff, for example load test code dynamically
environment.execute();
``

##install
with npm:
```
npm install jasminify
```
