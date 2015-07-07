var dissmatch = function(subject, pattern_) {
  //Return undefined if no match object is provided
  if(arguments.length < 2) return undefined;
  var pattern = arguments[1];
  //Return undefined if match object is not an object
  if(typeof pattern !== 'object') return undefined;
  if(typeof subject !== 'object') return new Error('subject should be an object.');
  var result = undefined;
  Object.getOwnPropertyNames(pattern).forEach(function (prop) {
    if(result || !pattern.hasOwnProperty(prop)) return;
    switch(/\[object (.+)\]/.exec(Object.prototype.toString.call(pattern[prop]))[1]){
      case 'Boolean'://Test presence
        if(pattern[prop]
            && !(prop in subject))
          result = new Error('subject[' + prop + '] should be defined');
        else if(!pattern[prop]
            && (prop in subject))
          result = new Error('subject[' + prop + '] should not be defined.');
        break;
      case 'RegExp'://Match Expression
        result = pattern[prop].exec(String(subject[prop])) !== null ?
          undefined :
          new Error('subject[' + prop + '] should match ' + String(pattern[prop]) + '.');
        break;
      case 'Array'://Match one of many
        result = new Error('subject[' + prop + '] should be one of [' + pattern[prop].join(', ') + '].');
        pattern[prop].forEach(function(item){
          if(!result) return;
          if(item === subject[prop]) result = undefined;
        });
        break;
      case 'Function'://Run a test function
          result = pattern[prop](subject[prop],subject);
        break;
      case 'Object'://Run Recursively
        result = typeof subject[prop] === 'object' ?
                dissmatch(subject[prop], pattern[prop]) :
                new Error('subject[' + prop + '] should be an object.');
        break;
      default://Match eactly
        if(pattern[prop] !== subject[prop]) result = new Error('subject[' + prop + '] should be ' + String(pattern[prop]) + '.');
        break;
    }
  });
  if(arguments.length > 2 && !result){
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    args.shift();
    return dissmatch.apply(null, [subject].concat(args));
  };
  return result;
};
module.exports = dissmatch;
