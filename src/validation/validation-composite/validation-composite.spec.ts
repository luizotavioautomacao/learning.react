import { ValidationComposite } from '@/validation/validation-composite/validation-composite';
import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation';
import { faker } from '@faker-js/faker';

const makeSut = (): ValidationComposite => {
    const fieldValidationSpy = new FieldValidationSpy('any_field');
    const fieldValidationSpy2 = new FieldValidationSpy('any_field');
    fieldValidationSpy.error = new Error('any_first_error_message');
    fieldValidationSpy2.error = new Error('any_second_error_message');
    
    return new ValidationComposite([
        fieldValidationSpy,
        fieldValidationSpy2
    ])
}

describe("ValidationComposite", () => {

    test("Should return error if any validation fails", () => {
        const sut = makeSut();
        const error = sut.validate('any_field', 'any_value');
        expect(error).toBe('any_first_error_message');
    });

    // test("Should return false if field is valid email", () => {
    //     const sut = makeSut();
    //     const error = sut.validate(faker.internet.email());
    //     expect(error).toBeFalsy();
    // });

    // test("Should return false if field is email empty", () => {
    //     const sut = makeSut();
    //     const error = sut.validate(faker.internet.email());
    //     expect(error).toBeFalsy();
    // });

});