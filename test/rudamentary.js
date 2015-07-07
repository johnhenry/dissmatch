var dissmatch = require('../');
var subject = {
  age     : 25,
  first   : 'john',
  middle  : 'jayyy',
  last    : 'henry',
  full    : 'john jayyy henry',
  gender  : 'm',
  acc     : {
    name    : "bill"
  },
  ssn     : undefined
};
var mo = {
  age   : function($){
    if(!($ >= 18))
      return new Error('Age must be greater than or equal to eighteen')
  },
  full  : function($, $$){
    if(!($ === $$.first + ' ' + $$.middle + ' ' + $$.last))
      return new Error('Full name must be combined first, middle, and last.')
  },
  middle: /^jay+$/, gender: ['m','f'], acc:  {name: "bill"},
};
var mo2 = {
  age   : function($){
    if(!($ <= 30))
      return new Error('Age must be less than or equal to thirty.')
  },
  ssn   : true, acc  : {name : /^bi/}
};
Object.prototype.dissmatch = function(matchobject_){
  return dissmatch.apply(null,
    [this].concat(Array.prototype.slice.call(arguments)));
  //return dissmatch(this, subject);
};
Object.prototype.dissexec = function(subject){
  return subject.dissmatch(this);
  //return dissmatch(subject, this);
};
var dissmatchError = subject.dissmatch(mo, mo2);
if(dissmatchError) throw dissmatchError;
//console.log("dissmatch: " + subject.dissmatch(mo, mo2));
//console.log("dissexec: " + mo.dissexec(subject));
