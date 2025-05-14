import { EmailValidation } from '@/validation/validators/email/email-validation';
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation';
import { ValidationBuilder as sut } from '@/validation/validators/builder/validation-builder';
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation';
import { faker } from '@faker-js/faker';

const any_field = faker.database.column();
const field_length = 5;

describe("ValidationBuilder", () => {

    test("Should return RequiredFieldValidation", () => {
        const validations = sut.field(any_field).required().build();
        expect(validations).toEqual([new RequiredFieldValidation(any_field)]);
    });

    test("Should return EmailValidation", () => {
        const validations = sut.field(any_field).email().build();
        expect(validations).toEqual([new EmailValidation(any_field)]);
    });

    test("Should return MinLengthValidation", () => {
        const validations = sut.field(any_field).min(field_length).build();
        expect(validations).toEqual([new MinLengthValidation(any_field, field_length)]);
    });

    test("Should return a list of validations", () => {
        const validations = sut.field(any_field).required().email().min(field_length).build();
        expect(validations).toEqual([
            new RequiredFieldValidation(any_field),
            new EmailValidation(any_field),
            new MinLengthValidation(any_field, field_length),
        ]);
    });

});