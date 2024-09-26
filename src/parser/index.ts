// src/parser/index.ts

import { tokenize } from './tokenizer';
import { ErrorManager } from './errorManager';
import { handleIf , handleVariableDeclaration } from './visitor';
import { AST, Statement } from './types'; // استيراد الأنواع من ast.ts

export const errorManager = new ErrorManager();
const keywords = ['let', 'const', 'if', 'else', 'function'];

export function parse(input: string): AST {
    const tokens = tokenize(input);
    const statements: Statement[] = [];

    let i = 0;

    while (i < tokens.length) {
        if (tokens[i] === 'if') {
            const result = handleIf(tokens, i, statements);
            i += result.skip;
        } else if (tokens[i] === 'let' || tokens[i] === 'const') {
            const result = handleVariableDeclaration(tokens, i, statements);
            i += result.skip;
        } else if (tokens[i] === ';') {
            i++; // تخطي الفاصلة المنقوطة
        } else {
            errorManager.addError("Unreachable code detected.", i);
            i++;
        }
    }

    errorManager.displayErrors();
    return { statements };
}

const inputCode = `
if (x > 5) {
    let y = 20;
    if (y < 10) {
        let z = 30;
    }
}
`;

const ast = parse(inputCode);
console.log(JSON.stringify(ast, null, 2)); // لعرض شجرة التركيب بتنسيق جميل