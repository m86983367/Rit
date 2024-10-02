import * as nearley from "nearley";
import grammar from "./functions.js"; 
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
export default parser;

