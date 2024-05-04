import React from 'react'
import { RenderResult, fireEvent, render } from '@testing-library/react'
import Login from "./login"
import { ValidationSpy } from '@/presentation/test'

type SutTypes = {
    // authenticationSpy: AuthenticationSpy
    // setCurrentAccountMock: (account: Authentication.Model) => void
    sut: RenderResult
    validationSpy: ValidationSpy
}

type SutParams = {
    validationError: string
}



const makeSut = (params?: SutParams): SutTypes => {
    // const authenticationSpy = new AuthenticationSpy()
    const validationSpy = new ValidationSpy()
    const sut = render(<Login validation={validationSpy} />)
    return {
        sut,
        validationSpy
    }
    // const validationStub = new ValidationStub()
    // validationStub.errorMessage = params?.validationError
    // const { setCurrentAccountMock } = renderWithHistory({
    //     history,
    //     Page: () => Login({ validation: validationStub, authentication: authenticationSpy })
    // })
    // return {
    //     authenticationSpy,
    //     setCurrentAccountMock
    // }
}

describe('Login Component', () => {
    test('Should not render spinner and error on start', () => {
        const { sut } = makeSut()
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
    })

    test('Should not submit button start actived', () => {
        const { sut } = makeSut()
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
    })

    // test('Should correct inicial state from email', () => {
    //     const { getByTestId } = render(<Login />)
    //     const emailStatus = getByTestId('email-status')
    //     expect(emailStatus.title).toBe('Campo obrigatório')
    //     expect(emailStatus.textContent).toBe('[x]')
    // })

    // test('Should correct inicial state from password', () => {
    //     const { getByTestId } = render(<Login />)
    //     const passwordStatus = getByTestId('password-status')
    //     expect(passwordStatus.title).toBe('Campo obrigatório')
    //     expect(passwordStatus.textContent).toBe('[x]')
    // })

    test('Should call Validation with correct email', () => {
        const { sut, validationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        expect(validationSpy.fildName).toBe('email')
        expect(validationSpy.fieldValue).toBe('any_email')

    })

    test('Should call Validation with correct password', () => {
        const { sut, validationSpy } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        expect(validationSpy.fildName).toBe('password')
        expect(validationSpy.fieldValue).toBe('any_password')
    })
})