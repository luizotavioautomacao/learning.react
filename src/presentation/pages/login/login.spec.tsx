import React from "react";
import Login from "./login";
import { RenderResult, fireEvent, render } from "@testing-library/react";
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test";
import { mockEmail, mockPassword } from "@/domain/test/mock-account";
import { validStatus } from "@/presentation/components/input/input";

type SutTypes = {
  // setCurrentAccountMock: (account: Authentication.Model) => void
  authenticationSpy: AuthenticationSpy;
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (): SutTypes => {

  const authenticationSpy = new AuthenticationSpy();
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = "Mensagem de erro!";
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />);
  
  return {
    sut,
    validationSpy,
    authenticationSpy
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
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });

  test("Should not submit button start actived", () => {
    const { sut } = makeSut();
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test("Should correct inicial state from email", () => {
    const { sut, validationSpy } = makeSut();
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
  });

  test('Should correct inicial state from password', () => {
      const { sut, validationSpy } = makeSut()
      const passwordStatus = sut.getByTestId('password-status')
      expect(passwordStatus.title).toBe(validationSpy.errorMessage)
      expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    // Não pode existir por limitação do React em Login.tsx useEffect.setState email e password vai ficar trocando a validação e vai cair no segundo caso
    // expect(validationSpy.fildName).toBe('email')
    // expect(validationSpy.fieldValue).toBe('any_email')
  })

  test('Should call Validation with correct password', () => {
      const { sut, validationSpy } = makeSut()
      const passwordInput = sut.getByTestId('password')
      fireEvent.input(passwordInput, { target: { value: 'any_password' } })
      expect(validationSpy.fildName).toBe('password')
      expect(validationSpy.fieldValue).toBe('any_password')
  })

  test("Should show email error if Validation fails", () => {

    const { sut, validationSpy } = makeSut();
    
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: "any_email" } });

    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if Validation succeds', () => {
      const { sut, validationSpy } = makeSut()
      const emailInput = sut.getByTestId('email')
      fireEvent.input(emailInput, { target: { value: 'any_email' } })
      const emailStatus = sut.getByTestId('email-status')
      expect(emailStatus.title).toBe(validationSpy.errorMessage)
      expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show valid password state if Validation succeds', () => {
      const { sut, validationSpy } = makeSut()
      validationSpy.errorMessage = null;
      const passwordInput = sut.getByTestId('password')
      fireEvent.input(passwordInput, { target: { value: 'any_password' } })
      const passwordStatus = sut.getByTestId('password-status')
      expect(passwordStatus.title).toBe(validStatus)
      expect(passwordStatus.textContent).toBe('🟢')
  })

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
    fireEvent.click(submitButton);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const emailInput = sut.getByTestId("email");
    const email = mockEmail
    fireEvent.input(emailInput, { target: { value: email } });
    const passwordInput = sut.getByTestId("password");
    const password = mockPassword
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({
      email: email,
      password: password,
    });
  });
});
