// Based on the corn example from grain
// with json escaping of values added
var grain = require('grain'),
    Buffer = require('buffer').Buffer;

module.exports = function compile(template, locals, callback) {
  var regex = /@([a-z$_][a-z0-9$_]*)\(([^\)]*)\)/g,
      pos = 0, parts = [], match;

  function addPlain(input) {
    parts.push('chunks[' + parts.length + '] = ' + JSON.stringify(input).replace(/@[a-z$_][a-z0-9$_]*/g, function (match) {
      return '" + ' + match.substr(1) + ' + "';
    }).replace('"" + ', '').replace(' + ""', '') + ";");
  }
  while (match = regex.exec(template)) {
    // Push sync content on the stack
    if (match.index > pos) {
      addPlain(template.substr(pos, match.index));
      pos = match.index;
    }
    // Push on a async placeholder for the function call
    parts.push('execute(' + parts.length + ', ' + match[1] + (match[2] ? ', [' + match[2] + ']' : '') + ');');
    pos += match[0].length;
  }
  // If there is more sync content, push it on.
  if (pos < template.length) {
    addPlain(template.substr(pos));
  }
  // Add on header and footer to the generated code.
  parts.unshift('chunks = new Array(' + parts.length + ');');
  parts.push('check();');

  // Generate the code using the grain helper
  eval(grain(parts));

  // Do a little currying for the user
  return (locals && callback) ? compile(locals, callback) : compile;
};
