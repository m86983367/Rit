import parser from "../src/parser/index";
test("tect parser",()=>{
    parser.feed("myFunction (5) ");
    console.log(parser.results); 
})