import React, { useContext } from "react";
import Styles from "./input-styles.scss";
import Context from '@/presentation/contexts/form/form-context'

export const validStatus = "Ok!"

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {

  const { state, setState } = useContext(Context) // contexto criado em Login
  const error = state[`${props.name}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value // altera o estado com o valor atualizado do email
    })
  }

  const getStatus = (): string => {
    return error? '🔴': '🟢'
  }

  const getTitle = (): string => {
    return error || validStatus
  }
  
  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  );
};

export default Input;
