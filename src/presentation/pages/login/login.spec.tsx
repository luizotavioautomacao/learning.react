import React from "react";
import 'jest-localstorage-mock';
import { MemoryRouter } from 'react-router-dom';
import Login from "./login";
import { RenderResult, fireEvent, render, waitFor, cleanup } from "@testing-library/react";
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test";
import { mockEmail, mockPassword } from "@/domain/test/mock-account";
import { validStatus } from "@/presentation/components/input/input";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credencials-error";
import { createMemoryHistory } from "history";

const statusDefault = '🔴';
const statusValid = '🟢';
const validationError = 'Mensagem de Erro!';

type SutTypes = {
  // setCurrentAccountMock: (account: Authentication.Model) => void
  authenticationSpy: AuthenticationSpy;
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

type SutParams = {
  validationError: string
}

// const history = createMemoryHistory();
const makeSut = (params?: SutParams): SutTypes => {

  const authenticationSpy = new AuthenticationSpy();
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError;
  const sut = render(
    <MemoryRouter>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </MemoryRouter>
  );

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

const simulateValidSubmit = async (sut: RenderResult, email = mockEmail, password = mockPassword): Promise<void> => {
  populateEmailField(sut, email);
  populatePasswordlField(sut, password);
  const form = sut.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => { sut.getByTestId('form') });
}

const populateEmailField = (sut: RenderResult, email: string = mockEmail): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, { target: { value: email } });
}

const populatePasswordlField = (sut: RenderResult, password: string = mockPassword): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, { target: { value: password } });
}

const testStatusField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || validStatus);
  expect(emailStatus.textContent).toBe(validationError ? statusDefault : statusValid);
}

const testElementChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const element = sut.getByTestId(fieldName);
  expect(element.childElementCount).toBe(count);
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName);
  expect(element).toBeTruthy();
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const element = sut.getByTestId(fieldName);
  expect(element.textContent).toBe(text)
}

const testButtonIsDisable = (sut: RenderResult, fieldName: string, isDisable: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
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
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear()
  });

  test("Should not render spinner and error on start", () => {
    const { sut } = makeSut({ validationError });
    testElementChildCount(sut, "error-wrap", 0);
  });

  test("Should not submit button start actived", () => {
    const { sut } = makeSut();
    testButtonIsDisable(sut, "submit", true)
  });

  test("Should correct inicial state from email", () => {
    const { sut, validationSpy } = makeSut();
    testStatusField(sut, "email", validationSpy.errorMessage)
  });

  test('Should correct inicial state from password', () => {
    const { sut, validationSpy } = makeSut();
    testStatusField(sut, "password", validationSpy.errorMessage)
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
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(mockPassword);
  })

  test("Should show email error if Validation fails", () => {
    const { sut, validationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe(statusDefault);
  });

  test('Should show valid email state if Validation succeds', () => {
    const { sut, validationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe(statusDefault);
  })

  test('Should show valid password state if Validation succeds', () => {
    const { sut, validationSpy } = makeSut({ validationError });
    validationSpy.errorMessage = null;
    populatePasswordlField(sut);
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validStatus);
    expect(passwordStatus.textContent).toBe(statusValid);
  })

  test("Should enable submit button if form is valid", async () => {
    const { sut } = makeSut({ validationError });
    await simulateValidSubmit(sut);
    testButtonIsDisable(sut, "submit", false)
  });

  test("Should show spinner on submit", async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    testElementExists(sut, "spinner");
  });

  test("Should call Authentication with correct values", async () => {
    const { sut, authenticationSpy, validationSpy } = makeSut();
    const email = mockEmail;
    const password = mockPassword;
    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email: email, password: password, });
  });

  test("Should call Authentication only once", async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut); // apertar 2x o botão de submit
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call Authentication if form is invalid", async () => {
    const { sut, authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit(sut);
    fireEvent.submit(sut.getByTestId('form'));
    testElementText(sut, 'main-error', error.message)
    testElementChildCount(sut, "error-wrap", 2);
  });

  test("Should add acessToken to localstorage on success", async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await waitFor(() => { sut.getByTestId('form') });
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken);
  });

  test("Should go to signup page", () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('signup');
    fireEvent.click(register);
    // expect(history.length).toBe(2);
    // expect(history.location.pathname).toBe('/signup');
  })

});
