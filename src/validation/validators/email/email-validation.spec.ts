import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { faker } from '@faker-js/faker';
import { EmailValidation } from '@/validation/validators/email/email-validation';

const emailInvalid = faker.string.uuid();

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column());

describe("EmailValidation", () => {

    test("Should return error if email is invalid", () => {
        const sut = makeSut();
        const error = sut.validate(emailInvalid);
        expect(error).toEqual(new InvalidFieldError())
    });

    test("Should return false if field is email is valid", () => {
        const sut = makeSut();
        const error = sut.validate(faker.internet.email());
        expect(error).toBeFalsy();
    });

});