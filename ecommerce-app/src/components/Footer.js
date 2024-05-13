import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import newsletter from '../images/newsletter.png'

const Footer = () => {
  return (
    <>
      <footer className='footer-top py-4'>
        <div className='container.xxl'>
          <div className='row align-items-center'>
            <div className='col-auto'>
              <div className='footer-top-data d-flex gap-30 align-items-center'>
                <img src={newsletter} alt='newsletter'/>
                  <h2 className='mb-0 text-white'>Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className='col-auto'>
              <div className="input-group">
                <input type="text" className="form-control py-0" placeholder="Your Email Address" aria-label="Your Email Address" aria-describedby="basic-addon2"/>
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='footer-middle py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-auto'>
              <h4 className='text-white mb-4'>Contact Us</h4>
              <div>
                <address className='text-white fs-6 pt-2'>Example address, <br/>Lublin, Poland,
                  <br/>ZipCode: 123-321
                </address>
                <a href='tel:+12 123456789' className='text-white d-block mt-3 mb-2'>+12 123456789</a>
                <a href='mailto:' className='text-white d-block mt-3 mb-2'>123@gmail.com</a>
                <div className='social-icons d-flex align-items-center gap-30 mt-3'>
                  <a href='https://github.com/wyntia?tab=repositories'>
                    <FaLinkedin className='text-white fs-4'/>
                  </a>
                  <a href='https://github.com/wyntia?tab=repositories'>
                    <FaGithub className='text-white fs-4'/>
                  </a>
                  <a href='https://github.com/wyntia?tab=repositories'>
                    <FaFacebook className='text-white fs-4'/>
                  </a>
                  <a href='https://github.com/wyntia?tab=repositories'>
                    <FaInstagram className='text-white fs-4'/>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-auto'>
              <h4 className='text-white mb-4'>Information</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Privacy Policy</Link>
                <Link className='text-white py-2 mb-1'>Refund Policy</Link>
                <Link className='text-white py-2 mb-1'>Shipping Policy</Link>
                <Link className='text-white py-2 mb-1'>Terms & Conditions</Link>
                <Link className='text-white py-2 mb-1'>Blogs </Link>
              </div>
            </div>
            <div className='col-auto'>
              <h4 className='text-white mb-4'>Account</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>About Us</Link>
                <Link className='text-white py-2 mb-1'>Faq</Link>
                <Link className='text-white py-2 mb-1'>Contact</Link>
              </div>
            </div>
            <div className='col-auto'>
              <h4 className='text-white mb-4'>Quick Links</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Headphones</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
                <Link className='text-white py-2 mb-1'>Watches</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <p className='text-center mb-0 text-white'>
                &copy; {new Date().getFullYear()} - All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
