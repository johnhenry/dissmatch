#Dissmatch
negatively match objects
(note: this documentation is in a very rough state. Many parts are illegible.)
(also, there aren't really "test", perse)

##About
It is often infeasible to match entire objects. **Dissmatch** does not try to match the whole object. Instead, it matches a given object agains a pattern and returns a value only when there is a violation of the pattern. If there are parts of the object that are not defined in the pattern, **dismatch** simply ignores them.

##Installation
In your project's directory on the command line:

```bash
npm install --save dissmatch
```

In your project file:

```js
var dissmatch = require('dissmatch');
//work your magic here...
```
##API

###dissmatch
  is a single function:
```js
/**
*
*@param subject - Object
*@param pattern - Object
*/
var dissmatch = function(subject, pattern,[pattern2, pattern3...])
```

###subject
subject can be any javascript object

###Pattern
pattern is a specifically designed javascript object. Multiple patterns can be included and will be matched sequentially.

```js
var matchErrors =
  dissmatch(subject, pattern1) ||
  dissmatch(subject, pattern2) ||
  dissmatch(subject, pattern3);
```
is equivalent to
```js
var matchErrors =
  dissmatch(
    subject, pattern1, pattern2, pattern3);
```
####Types
Each key within a pattern points to an object. The type of object determines
how it matches against the value at the same key in the original subject.

#####Boolean
Booleans define presence
  - true -- return an error only if the key DOES NOT exist
  - false -- return an error only if the key DOES exist

#####RegExp
Regular Expressions will return an error only if the value in the subject
DOES NOT match.

#####Array
Expect an error only if the original value is not equal (===) to at least one of the values in the array.
Functions take two arguments, the value and the subject
  (value, subject) => :Error?

#####Function
Functions can define complex behavior and should be used with caution. Other Types
can be simulated/extended using functions.
Functions SHOULD be designed to evaluate a value and return a error only if the
value fails evaluation.
Functions take two arguments, the value and the subject
  (value, subject) => :Error?

#####Object
Nesting patterns within objects allows the testing of nested subjects.
