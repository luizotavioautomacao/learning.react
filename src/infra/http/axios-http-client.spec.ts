import { AxiosHttpClient } from "../../infra/http/axios-http-client"
import axios from 'axios'
import { HttpPostParams } from "../../data/protocols/http/http-post-client"
import { faker } from '@faker-js/faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

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

    // test('Should call axios with correct url', async () => {
    //     const url = faker.internet.url()
    //     const sut = makeSut()
    //     await sut.post({ url })
    //     expect(mockedAxios).toHaveBeenCalledWith(url)
    // })

    test('Should call axios with correct values (url, verd and body)', async () => {
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

})