import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { Link } from 'react-router-dom'
import { IoGitCompare } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import watch from '../images/watch.jpg'
import Container from '../components/Container';

const SingleProduct = () => {
    const props = { width: 400, height: 600, zoomWidth: 600, img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg" };
    const { orderedProduct } = useState(1);
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }
    return (
        <div>
            <Meta title={'Product Name'} />
            <BreadCrumb title='Product Name' />
            <Container class1='main-product-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-6 '>
                        <div className='main-product-image'>
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className='other-product-images d-flex flex-wrap gap-15'>
                            <div><img src={watch} alt='watch' className='img-fluid' /></div>
                            <div><img src='https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg' alt='watch' className='img-fluid' /></div>
                            <div><img src='https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg' alt='watch' className='img-fluid' /></div>
                            <div><img src='https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg' alt='watch' className='img-fluid' /></div>
                        </div>
                    </div>
                    <div className='col-6 '>
                        <div className='main-product-details'>
                            <div className='border-bottom'>
                                <h3 className='title'>Timex Men's Expedition Scout 40mm Watch</h3>
                            </div>
                            <div className='border-bottom py-3'>
                                <p className='price'>$100</p>
                                <div className='d-flex align-items-center gap-10'>
                                    <ReactStars
                                        count={5}
                                        value={4}
                                        size={24}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className='mb-0'>2 Reviews</p>
                                </div>
                                <a href='#review'>Write a review</a>
                            </div>
                            <div className='border-bottom py-3'>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Type: </h3> <p className='product-data'>Watch</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand: </h3> <p className='product-data'>Havels</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Category: </h3> <p className='product-data'>Watch</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Tags: </h3> <p className='product-data'>Watch</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Availability: </h3> <p className='product-data'>In Stock</p>
                                </div>
                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h3 className='product-heading'>Size: </h3>
                                    <div className='d-flex flex-wrap gap-15'>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>S</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>M</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>L</span>
                                    </div>
                                </div>
                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h3 className='product-heading'>Color: </h3> <Color />
                                </div>
                                <div className='d-flex gap-15 align-items-center flex-row mt-2 mb-3'>
                                    <h3 className='product-heading'>Quantity: </h3>
                                    <div className=''>
                                        <input type='number' className='form-control' style={{ "width": "70px" }} min={1} max={10} />
                                    </div>
                                    <div className='d-flex align-items-center gap-30 ms-4'>
                                        <button className='button border-0' type='submit'>Add To Cart</button>
                                        <Link to='/signup' className='button signup border-0 align-items-center'>Buy It Now</Link>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    <div>
                                        <a href='#compare-product'> <IoGitCompare className='fs-5 mb-2' /> Add to Compare</a>
                                    </div>
                                    <div>
                                        <a href='#wishlist'><IoMdHeartEmpty className='fs-5 mb-2' /> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div className='d-flex gap-10 flex-column my-3'>
                                    <h3 className='product-heading'>Shipping & Returns: </h3> <p className='product-data'>Free Shipping. Eligible for Return, Refund or Replacement within 30 days of receipt. <b>5-10 business days!</b></p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Product Link: </h3>
                                    <button style={{ background: 'none', border: 'none', color: 'black', textDecoration: 'none', cursor: 'pointer', 'font-size': '14px' }} onClick={() => {
                                        copyToClipboard("https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg")
                                    }}>Copy Product Link</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='description-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Description</h4>
                        <div className='bg-white p-3'>

                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum orci tortor, eu rhoncus turpis ullamcorper vel. Proin ullamcorper vel sem vitae sodales. Praesent volutpat fermentum arcu. Ut in vulputate elit. Aliquam ex neque, suscipit vel metus in, ultrices pretium nulla. Maecenas viverra sapien vitae lobortis lacinia. Donec commodo nisi eu arcu facilisis consectetur. Mauris risus sem, consequat ut magna ac, pulvinar tincidunt ante. Suspendisse ut accumsan leo, iaculis efficitur sem.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='reviews-wrapper home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h3 id='review'>Reviews</h3>
                        <div className='review-inner-wrapper'>
                            <div className='review-head d-flex justify-content-between align-items-end'>
                                <div>
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars
                                            count={5}
                                            value={4}
                                            size={24}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0 t-review'>Based on 2 Reviews</p>
                                    </div>
                                </div>
                                {orderedProduct || (
                                    <div>
                                        <a href='#review' className='text-dark text-decoration-underline'>Write a Review</a>
                                    </div>
                                )}
                            </div>
                            <div className='review-form py-4'>
                                <h4>Write a Review</h4>
                                <form action='' className='d-flex flex-column gap-15'>
                                    <div>
                                        <ReactStars
                                            count={5}
                                            value={4}
                                            size={24}
                                            edit={true}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div>
                                        <textarea name='' id='' cols='30' className='w-100 form-control' rows='4' placeholder='Comments' />
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='button border-0'>Submit Review</button>
                                    </div>
                                </form>
                            </div>
                            <div className='reviews mt-4'>
                                <div className='review'>
                                    <div className='d-flex gap-10 align-items-center'>
                                        <h6 className='mb-0'>Wyntia</h6>
                                        <ReactStars
                                            count={5}
                                            value={4}
                                            size={24}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <p className='mt-3'>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='popular-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h3 className='section-heading'>Our Popular Products</h3>
                    </div>
                </div>
                <div className='row'>
                    <ProductCard />
                </div>
            </Container>
        </div>
    )
}

export default SingleProduct
