import Ticker from '../../components/UI/ticker/Ticker';
import './logIn.css';
import UsersService from '../../API/UsersService';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/button/Button';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  
});

const initialValues: IUsers = {
  email: '',
  password: '',
};

function LogIn() {
  const navigate = useNavigate()
  const handleSubmit = async (values: IUsers, { setErrors }: FormikHelpers<IUsers>) => {
    try {
      const response = await UsersService.login(values.email, values.password);
      if(response.status === 200) {
        localStorage.setItem('Token', response.data.user.token)
        navigate('/')
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setErrors({email:'Email or password is wrong!', password:'Email or password is wrong!'});
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="login__container">
        <p className="title">Log in</p>
        <div className="form">
         <div className='form__left'>
         <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
              <Form>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error-message"/>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error-message"/>
                <div className="button__wrapper">
                  <div className="arrow"></div>
                  <Button variant='auth' type="submit">
                    Log In
                  </Button>
                </div>
              </Form>
          </Formik>
          <span className='signin'>
            Don't have an account?
            <button onClick={() => navigate('/signin')}>Sign in</button>
          </span>
         </div>
          <img
            className="planet"
            src="https://www.sainturbain.com/wp-content/uploads/2023/02/PLANETE_CONTACT.svg"
            alt="planet"
          />
        </div>
      </div>
      <Ticker />
    </>
  );
}

export default LogIn;
