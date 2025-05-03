import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { faker } from '@faker-js/faker';
import { EmailValidation } from '@/validation/validators/email/email-validation';

const makeSut = (): EmailValidation => new EmailValidation(faker.string.uuid());

describe("EmailValidation", () => {

    test("Should return error if email is invalid", () => {
        const sut = makeSut();
        const error = sut.validate('');
        expect(error).toEqual(new InvalidFieldError())
    });

    // test("Should return false if field is field not empty", () => {
    //     const sut = makeSut();
    //     const error = sut.validate(faker.string.uuid());
    //     expect(error).toBeFalsy();
    // });

});