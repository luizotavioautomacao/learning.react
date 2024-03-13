import { AxiosHttpClient } from "../../infra/http/axios-http-client"
import axios from 'axios'
import { HttpPostParams } from "../../data/protocols/http/http-post-client"
import { faker } from '@faker-js/faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedAxiosResult = {
    data: {
        email: faker.internet.email(),
        password: faker.internet.password()
    },
    status: faker.number.int()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
    const sut = new AxiosHttpClient()
    return sut
}

const mockPostRequest = (): HttpPostParams<any> => {
    return {
        url: faker.internet.url(),
        body: {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }
}

describe('AxiosHttpClient', () => {

    test('Should call axios with correct values (url, verd and body)', async () => {
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should call axios with correct values (url, verd and body)', async () => {
        const sut = makeSut()
        const httpResponse = await sut.post(mockPostRequest())
        expect(httpResponse).toEqual({
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data
        })
    })

})