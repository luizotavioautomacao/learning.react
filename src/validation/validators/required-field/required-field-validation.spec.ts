import { RequiredFieldError } from "@/validation/errors/required-field-error";
import { RequiredFieldValidation } from "@/validation/validators/required-field/required-field-validation";
import { faker } from '@faker-js/faker';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column());

describe("RequiredFieldValidation", () => {

    test("Should return error if field is empty", () => {
        const sut = makeSut();
        const error = sut.validate('');
        expect(error).toEqual(new RequiredFieldError())
    });

    test("Should return false if field is field not empty", () => {
        const sut = makeSut();
        const error = sut.validate(faker.string.uuid());
        expect(error).toBeFalsy();
    });

});