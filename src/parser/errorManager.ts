// src/parser/errorManager.ts

export class ErrorManager {
    private errors: { message: string; index: number }[] = [];

    public addError(message: string, index: number) {
        this.errors.push({ message, index });
    }

    public displayErrors() {
        if (this.errors.length === 0) {
            console.log("No errors found.");
            return;
        }

        console.log("Errors:");
        this.errors.forEach((error) => {
            console.error(`Error at token index ${error.index}: ${error.message}`);
        });
    }
}
