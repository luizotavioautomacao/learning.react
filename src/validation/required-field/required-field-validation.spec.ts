import { RequiredFieldError } from "@/validation/errors/requried-field-error";
import { RequiredFieldValidation } from "@/validation/required-field/required-field-validation";

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

});