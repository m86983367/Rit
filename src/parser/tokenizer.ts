// src/parser/tokenizer.ts

export function tokenize(input: string): string[] {
    // إضافة مسافات حول الرموز لسهولة الفصل
    return input
        .replace(/\{/g, ' { ')
        .replace(/\}/g, ' } ')
        .replace(/\{/g, ' ( ')
        .replace(/\}/g, ' ) ')
        .replace(/=/g, ' = ')
        .replace(/;/g, ' ; ')
        .split(/\s+/) // تقسيم على المسافات
        .filter(token => token.length > 0); // إزالة الرموز الفارغة
}
