import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import watch from '../images/watch.jpg'
import Container from '../components/Container';
const CheckOut = () => {
  return (
    <div>
      <Container class1='checkout-wrapper py-5 home-wrapper-2'>
          <div className='row'>
            <div className='col-7'>
              <div className='checkout-left-data'>
                <h3 className='website-name'>Shop</h3>
                <nav style={{ "--bs-breadcrumb-divider": '>' }} aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item total-price"><Link to='/cart' className='text-dark'>Cart</Link></li> &nbsp; /
                    <li className="breadcrumb-item total-price">Information</li>&nbsp; /
                    <li className="breadcrumb-item total-price">Shipping</li> &nbsp; /
                    <li className="breadcrumb-item total-price">Payment</li>
                  </ol>
                </nav>
                <h4 className='title total'>
                  Contact Information
                </h4>
                <p className='user-details total'>
                  email@email.com
                </p>
                <h4 className='mb-3'>
                  Shipping Address 
                </h4>
                <form action='' className='d-flex gap-15 flex-wrap justify-content-between'>
                  <div className='w-100'>
                    <select className='form-control form-select' id=''>
                      <option value='' selected disabled>Select Country</option>
                    </select>
                  </div>
                  <div className='flex-grow-1'>
                    <input type='text' className='form-control' placeholder='First Name' />
                  </div>
                  <div className='flex-grow-1'>
                    <input type='text' className='form-control' placeholder='Last Name' />
                  </div>
                  <div className='w-100'>
                    <input type='text' className='form-control' placeholder='Address' />
                  </div>
                  <div className='w-100'>
                    <input type='text' className='form-control' placeholder='Apartment' />
                  </div>
                  <div className='flex-grow-1'>
                    <input type='text' className='form-control' placeholder='City' />
                  </div>
                  <div className='flex-grow-1'>
                    <select className='form-control form-select' id=''>
                      <option value='' selected disabled>Select State</option>
                    </select>
                  </div>
                  <div className='flex-grow-1'>
                    <input type='text' className='form-control' placeholder='ZIP Code' />
                  </div>
                  <div className='w-100'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <Link to='/cart' className='text-dark'><IoMdArrowBack className='me-2' />Back to Cart</Link>
                      <Link to='/shipping' className='button'>Continue to Shipping</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-5'>
              <div className='border-bottom py-4'>
                <div className='d-flex gap-15  mb-2 align-items-center'>
                  <div className='w-75 d-flex gap-10'>
                    <div className='w-25 position-relative'>
                      <span className='badge bg-secondary text-white rounded-circle p-1 position-absolute' style={{"top": "-10px", "right": "2px"}}>1</span>
                      <img src={watch} alt='watch' className='img-fluid' />
                    </div>
                    <div>
                      <h5 className='total-price'>Watch</h5>
                      <p className='total-price'>Super comfortable watch</p>
                    </div>
                  </div>
                  <div className='flex-grow-1'>
                    <h5 className='total'>$ 100</h5>
                  </div>
                </div>
              </div>
              <div className=''>
                <div className='d-flex justify-content-between align-items-center pt-4'>
                  <p className='mb-0 total'>SubTotal</p>
                  <p className='mb-0 total-price'>$ 1235</p>
                </div>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center border-bottom'>
                  <p className='mb-4 total'>Shipping</p>
                  <p className='mb-4 total-price'>$ 1235</p>
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center pt-4'>
                <h4 className='total'>Total</h4>
                <h5 className='total-price'>USD $ 1235</h5>
              </div>
            </div>
          </div>
        </Container>
      </div>
  )
}

export default CheckOut
