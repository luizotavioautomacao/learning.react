import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation';
import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { faker } from '@faker-js/faker';

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5);

describe("MinLengthValidation", () => {

    test("Should return error if value is invalid", () => {
        const sut = makeSut();
        const error = sut.validate('value');
        expect(error).toEqual(new InvalidFieldError())
    });

    // test("Should return false if field is email is valid", () => {
    //     const sut = makeSut();
    //     const error = sut.validate(faker.internet.email());
    //     expect(error).toBeFalsy();
    // });

});