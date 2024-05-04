import React, { useState } from "react";
import Styles from "./login-styles.scss";
import { Header, Footer, Input, FormStatus } from "@/presentation/components";
import Context from '@/presentation/contexts/form/form-context'

type StateProps = {
  isLoading: boolean
}

const Login: React.FC = () => {

  const [state] = useState<StateProps>({
    isLoading: false
  })

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" className={Styles.submit} type="submit" disabled>
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
