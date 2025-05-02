import { RequiredFieldError } from "@/validation/errors/requried-field-error";
import { RequiredFieldValidation } from "@/validation/required-field/required-field-validation";
import { faker } from '@faker-js/faker'

describe("RequiredFieldValidation", () => {

    // afterEach(cleanup);

    beforeEach(() => {
        localStorage.clear()
    });

    test("Should return error if field is empty", () => {
        const sut = new RequiredFieldValidation('email');
        const error = sut.validate('');
        expect(error).toEqual(new RequiredFieldError())
    })

    test("Should return false if field is field not empty", () => {
        const sut = new RequiredFieldValidation('email');
        const error = sut.validate(faker.string.uuid());
        expect(error).toBeFalsy();
    })

});