import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

const loginSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const Login = () => {

    const dispach= useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            dispach(loginUser(values));
        },
    });

    return (
        <div>
            <Meta title={'Login'} />
            <BreadCrumb title='Login' />
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Login</h3>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput type='email' name='email' placeholder='Email' onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} value={formik.values.email} />
                                <div className='error mb-0'>
                                    {
                                        formik.touched.email && formik.errors.email ? <p className='mb-0 text-danger'>{formik.errors.email}</p> : null
                                    }
                                </div>
                                <CustomInput type='password' name='password' placeholder='Password' onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password')} value={formik.values.password} />
                                <div className='error mb-0'>
                                    {
                                        formik.touched.password && formik.errors.password ? <p className='mb-0 text-danger'>{formik.errors.password}</p> : null
                                    }
                                </div>
                                <div>
                                    <Link to='/forgot-password'>Forgot Password?</Link>
                                    <div className='mt-2 d-flex justify-content-center gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'>Login</button>
                                        <Link to='/signup' className='button signup border-0'>SignUp</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Login
