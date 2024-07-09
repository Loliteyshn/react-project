import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { CreateField, FormControl } from "../common/FormsControls/FormsControls";
import { requiredField } from "../../utils/validators/validators";
import { Navigate } from "react-router-dom";
import styles from "../common/FormsControls/FormsControls.module.css"

const LoginForm = ({handleSubmit, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      {CreateField("Email", "email", [requiredField], "input")}
      {CreateField("Password", "password", [requiredField], "input", {type: 'password'})}
      {CreateField(null, "rememberMe", [], "input", {type: 'checkbox'}, "remember me")}
      
      {error && <div className={styles.formSummaryError}>
        {error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>

  );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);


const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  }

  if (props.isAuth) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, { login })(Login);