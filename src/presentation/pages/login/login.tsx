import React, { useState, useEffect } from "react";
import Styles from "./login-styles.scss";
import { Header, Footer, Input, FormStatus } from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-context";
import { IValidation } from "@/presentation/protocols/validation";
import { IAuthentication } from "@/domain/usecases/authentication";

const log = true;
type Props = {
  validation?: IValidation;
  authentication: IAuthentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    errorMessage: "",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
  });

  useEffect(() => {
    // log ? console.log(1, state) : null
    setState({
      ...state,
      emailError: validation?.validate("email", state.email),
      passwordError: validation?.validate("password", state.password),
    });
  }, [state.email]);

  useEffect(() => {
    // log ? console.log(2, state) : null
    setState({
      ...state,
      passwordError: validation?.validate("password", state.password),
    });
  }, [state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setState({ ...state, isLoading: true });
    await authentication.auth({ email: state.email, password: state.password });
  };

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            className={Styles.submit}
            type="submit"
            disabled={!state.email || !state.password}
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
