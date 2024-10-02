@{%
  
%}

number -> [0-9]:+ {% 
  function(d) { 
    return parseInt(d.join(""), 10); 
  } 
%}
_ -> [/s]

fu_name -> [a-Z]+

fu_c -> number  

fu -> _ fu_name _ "(" fu_c ")" _ {% 
  function(data) { 
    return { 
      name: data[0], 
      argument: data[3] 
    }; 
  } 
%}
