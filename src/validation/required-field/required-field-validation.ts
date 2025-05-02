import { IFieldValidation } from "@/validation/protocols/field-validation";
import { RequiredFieldError } from "@/validation/errors/requried-field-error";

export class RequiredFieldValidation implements IFieldValidation {
    constructor(readonly field: string) { }

    validate(value: string): Error {
        return new RequiredFieldError();
    }
}