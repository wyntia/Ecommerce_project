import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import watch from '../images/watch.jpg'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';
import Color from '../components/Color';
import axios from 'axios';
import { base_url, config } from '../utils/axiosConfig';

const Cart = () => {
    const dispatch = useDispatch();
    const userCartState = useSelector(state => state.auth.cartProducts)
    useEffect(() => {
        dispatch(getUserCart());
    }, []);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${base_url}user/cart/${productId}`, config());
            // Po usunięciu produktu, odśwież koszyk
            await dispatch(getUserCart());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Meta title={'Cart'} />
            <BreadCrumb title='Cart' />
            <Container class1='cart-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='cart-header d-flex justify-content-between align-items-center'>
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        {

                            userCartState && userCartState.map((item, index) => {
                                return (
                                    <div className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center' key={index}>
                                        <div className='cart-col-1 d-flex align-items-center gap-15'>
                                            <div className='w-75'>
                                                <img src={item?.productId?.images[0]?.url} className='img-fluid' alt='product' /></div>
                                            <div className='w-25'>
                                                <p >{item?.productId?.title}</p>
                                                <p className='d-flex gap-3 '>Color:
                                                    <ul className='colors ps-0'>
                                                        <li style={{backgroundColor: item?.color?.title}}/>
                                                    </ul>
                                                </p>
                                                <p >Size: M</p>
                                            </div>
                                        </div>
                                        <div className='cart-col-2'>
                                            <h5 className='price'>$ {item?.productId?.price}</h5>
                                        </div>
                                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                                            <div className=''>
                                                <input type='number' className='form-control' id='' name='' min={1} max={10} value={item?.quantity} />
                                            </div>
                                            <div>
                                                <MdDelete className='text-danger' onClick={() => handleDelete(item?.productId?._id)} />
                                            </div>
                                        </div>
                                        <div className='cart-col-4'>
                                            <h5 className='price'>$ {item?.productId?.price * item?.quantity}</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className='col-12 py-2 mt-4'>
                            <div className='d-flex justify-content-between align-items-baseline'>
                                <Link to='/product' className='button'>Continue Shopping</Link>
                                <div className='d-flex flex-column align-items-center'>
                                    <h4>Subtotal: $ 400</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to='/checkout' className='button'>Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Cart
