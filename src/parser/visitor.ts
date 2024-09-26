import { errorManager } from './index';
import { Statement } from './types';
export function handleKeyword(tokens: string[], index: number, statements: any[]) {
    const keyword = tokens[index];

    if (keyword === "let" || keyword === "const") {
        return handleVariableDeclaration(tokens, index, statements);
    } else if (keyword === "if") {
        return handleIf(tokens, index, statements);
    } else if (keyword === "function") {
        return handleFunction(tokens, index, statements);
    }
    return { skip: 0 };
}

function handleVariableDeclaration(tokens: string[], index: number, statements: any[]) {
    const variableName = tokens[index + 1]; // اسم المتغير
    const assignmentOperator = tokens[index + 2]; // عامل الإسناد
    const value = tokens[index + 3]; // القيمة

    if (assignmentOperator === "=" && value) {
        statements.push({
            type: tokens[index],
            name: variableName,
            value: value
        });
        return { skip: 3 }; // تخطي 3 عناصر
    } else {
        errorManager.addError(`Invalid assignment for variable '${variableName}'`, index);
        return { skip: 0 };
    }
}

function handleFunction(tokens: string[], index: number, statements: any[]) {
    const functionName = tokens[index + 1]; // اسم الدالة
    const params = tokens.slice(index + 2).join(" "); // البارامترات

    statements.push({
        type: 'function',
        name: functionName,
        params: params
    });
    return { skip: 2 + params.split(" ").length }; // تخطي اسم الدالة والبارامترات
}

function handleIf(tokens: string[], index: number, statements: Statement[]): { skip: number } {
    let i = index + 1; // البدء بعد if

    // 1. تحليل الشرط بعد if
    const { condition, skip: conditionSkip } = parseCondition(tokens, i);
    i += conditionSkip; // تخطي الرموز الخاصة بالشرط

    // 2. التحقق من وجود '{' بعد الشرط
    if (tokens[i] !== '{') {
        errorManager.addError("Missing opening brace after if condition.", i);
        return { skip: 0 };
    }
    i++; // تخطي '{'

    // 3. تحليل جسم if
    const { body, skip: bodySkip } = parseBody(tokens, i);
    i += bodySkip; // تخطي الجسم

    // 4. التحقق من إغلاق الكتلة الشرطية بشكل صحيح
    if (tokens[i] !== '}') {
        errorManager.addError("Missing closing brace for if statement.", i);
        return { skip: 0 };
    }

    // 5. إضافة جملة if إلى شجرة العبارات
    statements.push({
        type: 'if',
        condition: condition,
        body: body
    });

    return { skip: i - index + 1 }; // إرجاع عدد الرموز التي تم تخطيها
}

function parseCondition(tokens: string[], index: number): { condition: string, skip: number } {
    let condition = "";
    let i = index;

    while (i < tokens.length && tokens[i] !== '(') {
        condition += tokens[i] + " ";
        i++;
    }

    if (tokens[i] !== '(') {
        errorManager.addError("Expected '(' for if condition.", i);
        return { condition: "", skip: 0 };
    }

    condition += tokens[i]; // إضافة '(' إلى الشرط
    i++; // الانتقال بعد '('

    return { condition: condition.trim(), skip: i - index };
}
function parseBody(tokens: string[], index: number): { body: Statement[], skip: number } {
    const body: Statement[] = [];
    let braceDepth = 1; // عد الأقواس
    let i = index;

    while (i < tokens.length && braceDepth > 0) {
        if (tokens[i] === '{') {
            braceDepth++;
        } else if (tokens[i] === '}') {
            braceDepth--;
        } else if (tokens[i] === 'if') {
            const result = handleIf(tokens, i, body);
            i += result.skip;
        } else if (tokens[i] === 'let' || tokens[i] === 'const') {
            const result = handleVariableDeclaration(tokens, i, body);
            i += result.skip;
        } else {
            errorManager.addError("Invalid statement inside if body.", i);
        }
        i++;
    }

    if (braceDepth !== 0) {
        errorManager.addError("Missing closing brace for if body.", i);
    }

    return { body, skip: i - index };
}

export { handleIf , handleVariableDeclaration };





