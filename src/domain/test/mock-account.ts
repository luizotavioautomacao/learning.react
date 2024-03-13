import { AccountModel } from "../model/account-model";
import { AuthenticationParams } from "../usecases/authentication";
import { faker } from '@faker-js/faker';

export const mockAuthentication = (): AuthenticationParams => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}

export const mockAccountModel = (): AccountModel => {
    return {
        accessToken: faker.string.uuid()
    }
}