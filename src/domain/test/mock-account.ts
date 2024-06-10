import { AccountModel } from "../model/account-model";
import { AuthenticationParams } from "../usecases/authentication";

export const mockEmail = "any_email";
export const mockPassword = "any_password";

export const mockAuthentication = (): AuthenticationParams => {
    return {
        email: mockEmail,
        password: mockPassword
    }
}

export const mockAccountModel = (): AccountModel => {
    return {
        accessToken: 'faker.string.uuid()'
    }
}