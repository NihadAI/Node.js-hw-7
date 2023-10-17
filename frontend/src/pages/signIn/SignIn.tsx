import Ticker from '../../components/UI/ticker/Ticker';
import './signIn.css';
import UsersService from '../../API/UsersService';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/button/Button';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});


const initialValues: IUsers = {
  email: '',
  password: '',
  confirmPassword: '',
};

function SignIn() {
  const navigate = useNavigate()

  const handleSubmit = async (values: IUsers, { setErrors }: FormikHelpers<IUsers>) => {
    try {
      // Check if password and confirmPassword match
      if (values.password !== values.confirmPassword) {
        console.log('Password and Confirm Password do not match.');
        return;
      }
      const response = await UsersService.register(values.email, values.password, values.confirmPassword);

      if (response.status === 200) {
        localStorage.setItem('Token', response.data.token);
        navigate('/');
        console.log('User registered successfully.');
      } else {
        console.error('Unexpected response:', response);
      }
      
    } catch (error: any) {
      if (error.response.status === 409) {
        setErrors({ email: 'This email already exist!' });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="signin__container">
        <p className="title">Sign in</p>
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
                <Field type="password" name="confirmPassword" placeholder="Confirm password" />
                <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
                <div className="button__wrapper">
                  <div className="arrow"></div>
                  <Button variant='auth' type="submit">
                    Sign In
                  </Button>
                </div>
              </Form>
          </Formik>
          <span className='login'>
            Have an account?
            <button onClick={() => navigate('/login')}>Log in</button>
          </span>
         </div>
          <img
            className="planet"
            src="https://www.sainturbain.com/wp-content/uploads/2023/02/PLANETE_CONTACT.svg"
            alt=""
          />
        </div>
      </div>
      <Ticker />
    </>
  );
}

export default SignIn;
