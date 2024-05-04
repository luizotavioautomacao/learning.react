import React, { useContext } from "react";
import Styles from "./input-styles.scss";
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Spinner: React.FC<Props> = (props: Props) => {

  const { state, setState } = useContext(Context)
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
    return '[x]'
  }
  const getTitle = (): string => {
    return error
  }
  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  );
};

export default Spinner;
