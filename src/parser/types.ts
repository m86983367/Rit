// src/parser/types.ts

export type Statement = 
    | VariableDeclaration
    | IfStatement;

export interface VariableDeclaration {
    type: 'let' | 'const';
    name: string;
    value: string;
}

export interface IfStatement {
    type: 'if';
    condition: string;
    body: Statement[];
}

export interface AST {
    statements: Statement[];
}
