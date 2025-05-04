import { ValidationComposite } from '@/validation/validation-composite/validation-composite';
import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation';
import { faker } from '@faker-js/faker';

const errorMessage1 = faker.string.uuid();
const errorMessage2 = faker.string.uuid();

type SutTypes = {
    sut: ValidationComposite,
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy(fieldName),
        new FieldValidationSpy(fieldName)
    ]

    const sut = new ValidationComposite(fieldValidationsSpy)

    return {
        sut,
        fieldValidationsSpy
    }
}

describe("ValidationComposite", () => {

    test("Should return error if any validation fails", () => {
        const fieldName = faker.database.column();
        const { sut, fieldValidationsSpy } = makeSut(fieldName);
        fieldValidationsSpy[0].error = new Error(errorMessage1);
        fieldValidationsSpy[1].error = new Error('any_second_error_message');
        const error = sut.validate(fieldName, faker.string.uuid());
        expect(error).toBe(errorMessage1);
    });

    test("Should return falsy if validation succed", () => {
        const fieldName = faker.database.column();
        const { sut } = makeSut(fieldName);
        const error = sut.validate('any_field', 'any_value');
        expect(error).toBeFalsy()
    });

});