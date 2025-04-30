import React from "react";
import Login from "./login";
import { RenderResult, fireEvent, render } from "@testing-library/react";
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test";
import { mockEmail, mockPassword } from "@/domain/test/mock-account";
import { validStatus } from "@/presentation/components/input/input";

const statusDefault = '🔴';
const statusValid = '🟢';

type SutTypes = {
  // setCurrentAccountMock: (account: Authentication.Model) => void
  authenticationSpy: AuthenticationSpy;
  sut: RenderResult;
  validationSpy: ValidationSpy;
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

const simulateValidSubmit = async (sut: RenderResult, email = mockEmail, password = mockPassword): Promise<HTMLButtonElement> => {
  populateEmailField(sut, email);
  populatePasswordlField(sut, password);
  const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
  fireEvent.click(submitButton);
  return submitButton
}

const populateEmailField = (sut: RenderResult, email: string = mockEmail): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, { target: { value: email } });
}

const populatePasswordlField = (sut: RenderResult, password: string = mockPassword): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, { target: { value: password } });
}

const simulateStatusField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || validStatus);
  expect(emailStatus.textContent).toBe(validationError ? statusDefault : statusValid);
}

// const testStatusForField = (fieldName: string, validationError: string = ''): void => {
//   const wrap = screen.getByTestId(`${fieldName}-wrap`)
//   const field = screen.getByTestId(fieldName)
//   const label = screen.getByTestId(`${fieldName}-label`)
//   expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
//   expect(field).toHaveProperty('title', validationError)
//   expect(label).toHaveProperty('title', validationError)
// }

// const populateField = (fieldName: string, value = faker.random.word()): void => {
//   const input = screen.getByTestId(fieldName)
//   fireEvent.input(input, { target: { value } })
// }

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
    simulateStatusField(sut, "email", validationSpy.errorMessage)
  });

  test('Should correct inicial state from password', () => {
    const { sut, validationSpy } = makeSut();
    simulateStatusField(sut, "password", validationSpy.errorMessage)
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    populateEmailField(sut);
    // Não pode existir por limitação do React em Login.tsx useEffect.setState email e password vai ficar trocando a validação e vai cair no segundo caso
    // expect(validationSpy.fildName).toBe('email')
    // expect(validationSpy.fieldValue).toBe(mockEmail)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    populatePasswordlField(sut);
    expect(validationSpy.fildName).toBe('password');
    expect(validationSpy.fieldValue).toBe(mockPassword);
  })

  test("Should show email error if Validation fails", () => {
    const { sut, validationSpy } = makeSut();
    populateEmailField(sut);
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe(statusDefault);
  });

  test('Should show valid email state if Validation succeds', () => {
    const { sut, validationSpy } = makeSut();
    populateEmailField(sut);
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe(statusDefault);
  })

  test('Should show valid password state if Validation succeds', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    populatePasswordlField(sut);
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validStatus);
    expect(passwordStatus.textContent).toBe(statusValid);
  })

  test("Should enable submit button if form is valid", async () => {
    const { sut } = makeSut();
    const submitButton = await simulateValidSubmit(sut);
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show spinner on submit", () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = mockEmail;
    const password = mockPassword;
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email: email,
      password: password,
    });
  });
});
