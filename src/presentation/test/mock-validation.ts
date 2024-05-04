import { Validation } from "@/presentation/protocols/validation"

export class ValidationSpy implements Validation {
    errorMessage: string
    fildName: string
    fieldValue: string

    validate(fildName: string, fieldValue: string): string {
        this.fildName = fildName
        this.fieldValue = fieldValue
        return this.errorMessage
    }
}