import { AuthenticationParams } from "../../../domain/usecases/authentication";
import { HttpPostClient } from "../../../data/protocols/http/http-post-client";
import { HttpStatusCode } from "../../../data/protocols/http/http-response";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credencials-error";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { AccountModel } from "../../../domain/model/account-model";

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) { }
    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const htppResponse = await this.httpPostClient.post({ url: this.url, body: params })

        switch (htppResponse.statusCode) {
            case HttpStatusCode.ok: return htppResponse.body
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            case HttpStatusCode.badRequest: throw new UnexpectedError()
            default: throw new UnexpectedError()
        }
    }
}