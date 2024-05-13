import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { FaHome, FaInfo } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Container from '../components/Container';

const Contact = () => {
  return (
    <>
      <Meta title={'Contact Us'} />
      <BreadCrumb title='Contact Us' />
      <Container class1='contact-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4201.170019707907!2d22.54589249226725!3d51.23693060173427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722577729316bd9%3A0x442236391b743bc!2sPolitechnika%20Lubelska%2C%2020-618%20Lublin!5e0!3m2!1spl!2spl!4v1714405023056!5m2!1spl!2spl" width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='cont'></iframe>
          </div>
          <div className='col-12 mt-5'>
            <div className='contact-inner-wrapper d-flex justify-content-between'>
              <div>
                <h3 className='contact-title mb-4'>Contact Information</h3>
                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input type='text' className='form-control' placeholder='Name' />
                  </div>
                  <div>
                    <input type='text' className='form-control' placeholder='Email' />
                  </div>
                  <div>
                    <input type='text' className='form-control' placeholder='Mobile' />
                  </div>
                  <div>
                    <textarea name='' id='' cols='30' className='w-100 form-control' rows='4' placeholder='Comments' />
                  </div>
                  <div>
                    <button className='button border-0'>Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className='contact-title mb-4'>Get in touch with us</h3>
                <div className='contact-list'>
                  <ul className='ps-0'>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <FaHome className='fs-5' />
                      <address>
                        ul. Nadbystrzycka 38D
                        20-618 Lublin
                      </address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <FaPhoneAlt className='fs-5' />
                      <a href='tel:+48 81 538 43 00'>+48 81 538 43 00</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <IoMdMail className='fs-5' />
                      <a href='mailto:123@gmail.com'>
                        123@gmail.com
                      </a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <FaInfo className='fs-5' />
                      <p className='mb-0'> Monday-Friday 10-14</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Contact
