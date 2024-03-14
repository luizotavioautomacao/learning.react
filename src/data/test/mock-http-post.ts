import { HttpPostParams } from "../../data/protocols/http/http-post-client"
import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams<any> => {
    return {
        url: faker.internet.url(),
        body: {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }
}