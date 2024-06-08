import React from "react";
import { RenderResult, fireEvent, render } from "@testing-library/react";
import Login from "./login";
import { ValidationSpy } from "@/presentation/test";
import { inputGetStatus } from "@/presentation/components/input/input";

type SutTypes = {
  // authenticationSpy: AuthenticationSpy
  // setCurrentAccountMock: (account: Authentication.Model) => void
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  // const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError;
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
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
};

describe("Login Component", () => {
  test("Should not render spinner and error on start", () => {
    const { sut } = makeSut({ validationError: "Mensagem de erro!" });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });

  test("Should not submit button start actived", () => {
    const { sut } = makeSut({ validationError: "Mensagem de erro!" });
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test("Should correct inicial state from email", () => {
    const { sut } = makeSut();
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Campo obrigatório");
    expect(emailStatus.textContent).toBe("[x]");
  });

  // test('Should correct inicial state from password', () => {
  //     const { sut } = makeSut()
  //     const passwordStatus = sut.getByTestId('password-status')
  //     expect(passwordStatus.title).toBe('Campo obrigatório')
  //     expect(passwordStatus.textContent).toBe('[x]')
  // })

  // test('Should call Validation with correct email', () => {
  //     const { sut, validationSpy } = makeSut()
  //     const emailInput = sut.getByTestId('email')
  //     fireEvent.input(emailInput, { target: { value: 'any_email' } })
  //     expect(validationSpy.fildName).toBe('email')
  //     expect(validationSpy.fieldValue).toBe('any_email')
  // })

  // test('Should call Validation with correct password', () => {
  //     const { sut, validationSpy } = makeSut()
  //     const passwordInput = sut.getByTestId('password')
  //     fireEvent.input(passwordInput, { target: { value: 'any_password' } })
  //     expect(validationSpy.fildName).toBe('password')
  //     expect(validationSpy.fieldValue).toBe('any_password')
  // })

  test("Should show email error if Validation fails", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = "Mensagem de erro!";
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe(inputGetStatus());
  });

  // test('Should show valid email state if Validation succeds', () => {
  //     const { sut, } = makeSut()
  //     const emailInput = sut.getByTestId('email')
  //     fireEvent.input(emailInput, { target: { value: 'any_email' } })
  //     const emailStatus = sut.getByTestId('email-status')
  //     expect(emailStatus.title).toBe('Tudo certo!')
  //     expect(emailStatus.textContent).toBe(inputGetStatus())
  // })

  // test('Should show valid password state if Validation succeds', () => {
  //     const { sut } = makeSut()
  //     const passwordInput = sut.getByTestId('password')
  //     fireEvent.input(passwordInput, { target: { value: 'any_password' } })
  //     const passwordStatus = sut.getByTestId('password-status')
  //     expect(passwordStatus.title).toBe('Tudo certo!')
  //     expect(passwordStatus.textContent).toBe(inputGetStatus())
  // })

  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show spinner on submit", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  });
});
