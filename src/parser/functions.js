// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  // كود جافا سكريبت للإعدادات
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$1", "symbols": ["number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number", "symbols": ["number$ebnf$1"], "postprocess":  
        function(d) { 
          return parseInt(d.join(""), 10); 
        } 
        },
    {"name": "_", "symbols": [/[/s]/]},
    {"name": "fu_name$string$1", "symbols": [{"literal":"m"}, {"literal":"y"}, {"literal":"F"}, {"literal":"u"}, {"literal":"n"}, {"literal":"c"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fu_name", "symbols": ["fu_name$string$1"]},
    {"name": "fu_c", "symbols": ["number"]},
    {"name": "fu", "symbols": ["fu_name", "_", {"literal":"("}, "fu_c", {"literal":")"}, "_"], "postprocess":  
        function(data) { 
          return { 
            name: data[0], 
            argument: data[3] 
          }; 
        } 
        }
]
  , ParserStart: "number"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
