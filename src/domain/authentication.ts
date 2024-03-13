import { AccountModel } from "./model/account-model"

type AuthenticationParams = {
    email: string
    password: string
}

export interface IAuthentication {
    auth(params: AuthenticationParams): Promise<AccountModel>
}