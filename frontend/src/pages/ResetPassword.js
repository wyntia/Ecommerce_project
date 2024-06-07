import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'

const ResetPassword = () => {
    return (
        <div>
            <Meta title={'Reset Password'} />
            <BreadCrumb title='Reset Password' />
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Reset Password</h3>
                            <form action='' className='d-flex flex-column gap-15'>
                                <CustomInput type='password' name='password' placeholder='Password' />
                                <CustomInput type='password' name='confpassword' placeholder='Confirm Password' />
                                <div>
                                    <div className='mt-2 d-flex justify-content-center flex-column gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'>Ok</button>
                                        <Link to='/login' className='text-center'>Cancel</Link>
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

export default ResetPassword
