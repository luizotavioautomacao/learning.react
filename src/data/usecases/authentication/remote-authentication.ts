import { AuthenticationParams } from "../../../domain/usecases/authentication";
import { HttpPostClient } from "../../../data/protocols/http/http-post-client";
import { HttpStatusCode } from "../../../data/protocols/http/http-response";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credencials-error";

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient
    ) { }
    async auth(params: AuthenticationParams): Promise<void> {
        const htppResponse = await this.httpPostClient.post({ url: this.url, body: params })
        switch (htppResponse.statusCode) {
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: return Promise.resolve()
        }
    }
}