import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements IFieldValidation {
    constructor(readonly field, private readonly minLenght: number) { }

    validate(value: string): Error {
        return new InvalidFieldError();
    }
}
