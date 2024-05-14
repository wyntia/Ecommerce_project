import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice'

const signUpSchema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    mobile: yup.string().matches(/^\d{9}$/, 'Please enter a valid mobile number').required("Mobile number is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
});


const SignUp = () => {

    const dispach= useDispatch();
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            password: '',
        },
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            dispach(registerUser(values));
        },
    });

    return (
        <div>
            <Meta title={'Sign Up'} />
            <BreadCrumb title='Sign Up' />
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Sign Up</h3>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-10'>
                                <CustomInput type='text' name='firstname' placeholder='First name' value={formik.values.firstname} onChange={formik.handleChange('firstname')} onBlur={formik.handleBlur('firstname')}/>
                                <div className='error mb-0'>
                                    {
                                        formik.touched.firstname && formik.errors.firstname ? <p className='mb-0 text-danger'>{formik.errors.firstname}</p> : null
                                    }
                                </div>
                                <CustomInput type='text' name='lastname' placeholder='Last name' value={formik.values.lastname} onChange={formik.handleChange('lastname')} onBlur={formik.handleBlur('lastname')}/>
                                <div className='error mb-0'>
                                    {
                                        formik.touched.lastname && formik.errors.lastname ? <p className='mb-0 text-danger'>{formik.errors.lastname}</p> : null
                                    }
                                </div>
                                <CustomInput type='email' name='email' placeholder='Email' value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')}/>
                                <div className='error mb-0'>
                                    {
                                        formik.touched.email && formik.errors.email ? <p className='mb-0 text-danger'>{formik.errors.email}</p> : null
                                    }
                                </div>
                                <CustomInput type='tel' name='mobile' placeholder='Mobile Number' value={formik.values.mobile} onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')}/>
                                <div className='error mb-0'>
                                    {
                                        formik.touched.mobile && formik.errors.mobile ? <p className='mb-0 text-danger'>{formik.errors.mobile}</p> : null
                                    }
                                </div>
                                <CustomInput type='password' name='password' placeholder='Password' value={formik.values.password} onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password')}/>
                                <div className='error mb-0'>
                                    {
                                        formik.touched.password && formik.errors.password ? <p className='mb-0 text-danger'>{formik.errors.password}</p> : null
                                    }
                                </div>
                                <div>
                                    <div className='mt-2 d-flex justify-content-center flex-column gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'>Create Account</button>
                                        <Link to='/login' className='text-center'>Back to Login</Link>
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

export default SignUp
