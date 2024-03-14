import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => { 
    const mockedAxios = axios as jest.Mocked<typeof axios>

    const mockedAxiosResult = {
        data: {
            email: faker.internet.email(),
            password: faker.internet.password()
        },
        status: faker.number.int()
    }

    mockedAxios.post.mockResolvedValue(mockedAxiosResult)

    return mockedAxios
}
