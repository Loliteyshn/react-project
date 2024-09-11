import { connect, useDispatch, useSelector } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { CreateField, getStringKeys } from "../common/FormsControls/FormsControls";
import { requiredField } from "../../utils/validators/validators";
import { Navigate } from "react-router-dom";
import styles from "../common/FormsControls/FormsControls.module.css"
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import { FC } from "react";

type OwnProps = {
  captchaUrl: string
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, OwnProps> & OwnProps> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {CreateField<LoginFormValuesTypeKeys>("Email", "email", [requiredField], "input")}
      {CreateField<LoginFormValuesTypeKeys>("Password", "password", [requiredField], "input", { type: 'password' })}
      {CreateField<LoginFormValuesTypeKeys>("", "rememberMe", [], "input", { type: 'checkbox' }, "remember me")}

      {captchaUrl && (<img src={captchaUrl} />)}
      {captchaUrl && (CreateField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [requiredField], "input"))}

      {error && <div className={styles.formSummaryError}>
        {error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>

  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, OwnProps>({ form: 'login' })(LoginForm);
type LoginFormValuesType = {
  captcha: string;
  rememberMe: boolean;
  email: string
  password: string
}
type LoginFormValuesTypeKeys = getStringKeys<LoginFormValuesType>


export const Login: FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  }

  if (isAuth) {
    return <Navigate to={'/profile'} />
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl || ''} />
    </div>
  );
};