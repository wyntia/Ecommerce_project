import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import compare from '../images/compare.svg'
import wishlist from '../images/wishlist.svg'
import user from '../images/user.svg'
import cart from '../images/cart.svg'
import menu from '../images/menu.svg'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {

  const dispatch = useDispatch();
  const cartState = useSelector(state => state?.auth?.cartProducts);
  const auth = useSelector(state => state.auth);
  const [total, setTotal] = useState(null);
  const [firstname, setFirstname] = useState('');

  useEffect(() => {

    if (auth?.user?.firstname) {
      setFirstname(auth.user.firstname);
  }

    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum += cartState[i]?.productId?.price * cartState[i]?.quantity;
      setTotal(sum);
    }
  }, [cartState, auth]);
  return (
    <>
      <header className='header-top-strip py-3'>
        <div className="container-xxl">
          <div className='row'>
            <div className='col-6'>
              <p className='text-white mb-0 text-center'>
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className='col-6'>
              <p className='text-end text-white mb-0 text-center'>
                Hotline:
                <a className='text-white' href='tel: +12 123456789'>
                  +12 123456789
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className='header-upper py-3'>
        <div className='row align-items-center text-center'>

          <div className='col-auto text-center'>
            <h1>
              <Link className='text-white'>
                Lo Go
              </Link>
            </h1>
          </div>
          <div className='col-auto '>
            <div className="input-group">
              <input type="text" className="form-control py-2" placeholder="Search product" aria-label="Search product" aria-describedby="basic-addon2" />
              <span className="input-group-text py-2" id="basic-addon2"><BsSearch className='fs-6' /></span>
            </div>
          </div>
          <div className='col-auto'>
            <div className='header-upper-links d-flex align-items-center justify-content-between'>
              <div>
                <Link to='/compare-product' className='d-flex align-items-center gap-10 text-white'>
                  <img className='header-img' src={compare} alt="comapre" />
                  <p className='mb-0'>
                    Compare <br /> Products
                  </p>
                </Link>
              </div>
              <div>
                <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                  <img className='header-img' src={wishlist} alt="wishlist" />
                  <p className='mb-0'>
                    Favourite <br /> Wishlist
                  </p>
                </Link>
              </div>
              <div>
                <Link to='/login' className='d-flex align-items-center gap-10 text-white'>
                  <img className='header-img' src={user} alt="user" />
                  <p className='mb-0'>
                    {auth?.isSuccess ? firstname : "Login"} <br /> My Account
                  </p>
                </Link>
              </div>
              <div>
                <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                  <img className='header-img' src={cart} alt="cart" />
                  <div className='d-flex flex-column gap-10'>
                    <span className='badge bg-white text-dark'>{cartState?.length}</span>
                    <p className='mb-0'>$ {total ? total : 0}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className='header-bottom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-auto'>
              <div className='menu-bottom d-flex align-items-center gap-30'>
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center text-white"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <img src={menu} alt="menu" />
                      <span className='me-5 d-inline-block'>
                        Shop Categories</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item text-white" to="">Action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-centr gap-15'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
