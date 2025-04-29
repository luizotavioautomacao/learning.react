import { mockAccountModel, mockAuthentication } from "@/domain/test/mock-account"
import { InvalidCredentialsError } from "@/domain/errors/invalid-credencials-error"
import { UnexpectedError } from "@/domain/errors/unexpected-error"
import { HttpClientSpy } from "@/data/test/mock-http-client"
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication"
import { HttpStatusCode } from "@/data/protocols/http/http-response"
import { AccountModel } from "@/domain/model/account-model"
import { AuthenticationParams } from "@/domain/usecases/authentication"
import { faker } from '@faker-js/faker'

type SutTypes = {
    sut: RemoteAuthentication,
    httpPostClientSpy: HttpClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpClientSpy<AuthenticationParams, AccountModel>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {

    test('Should call HttpClient with correct url', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    });

    test('Should call HttpClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    });

    test('Should throw InvalidCredentialsError if HttpPostClient with returns 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    });

    test('Should throw UnexpectedError if HttpPostClient with returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    });

    test('Should throw UnexpectedError if HttpPostClient with returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    });

    test('Should throw UnexpectedError if HttpPostClient with returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    });


    test('Should return an AccountModel if HttpPostClient with returns 200', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const htttResult = mockAccountModel()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: htttResult
        }
        const account = await sut.auth(mockAuthentication())
        await expect(account).toEqual(htttResult)
    });


});