import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoGitCompare } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import watch from '../images/watch.jpg'
import Container from '../components/Container';
import wish from '../images/wish.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct, addToWishlist } from '../features/products/productSlice';
import { addProdToCart, getUserCart } from '../features/user/userSlice';
import { toast } from "react-toastify";

const SingleProduct = () => {
    const location = useLocation();
    const getProductId = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.auth.cartProducts);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const productState = useSelector(state => state.product.product);

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart());
    }, []);
    const addToWish = (id) => {
        dispatch(addToWishlist(id));
    }
    useEffect(() => {
        if (cartState) {
            for (let i = 0; i < cartState.length; i++) {
                if (getProductId === cartState[i]?.productId?._id) {
                    setAlreadyAdded(true);
                    break;
                }
            }
        }
    }, [cartState, getProductId, productState]);

    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const prodImgZoom = productState && productState.images && productState.images[0] ? productState.images[0].url : 'defaultImageUrl';
    const props = { width: 400, height: 600, zoomWidth: 600, img: prodImgZoom };
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
    const uploadCart = () => {
        if (color === null) {
            toast.error('Please select a color')
            return false;
        }
        else {
            dispatch(addProdToCart({ product: productState?._id, quantity, color, price: productState?.price }));
        }
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
                            <div><img src={productState && productState.images && productState.images[0] ? productState.images[0].url : 'defaultImageUrl'} alt='watch' className='img-fluid' /></div>
                            <div><img src={productState && productState.images && productState.images[1] ? productState.images[1].url : 'defaultImageUrl'} alt='watch' className='img-fluid' /></div>
                        </div>
                    </div>
                    <div className='col-6 '>
                        <div className='main-product-details'>
                            <div className='border-bottom'>
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className='border-bottom py-3'>
                                <p className='price'>$ {productState?.price}</p>
                                <div className='d-flex align-items-center gap-10'>
                                    {
                                        productState &&
                                        <ReactStars
                                            count={5}
                                            value={Number(productState.totalrating) || 0}
                                            size={24}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    }
                                    <p className='mb-0'>{productState?.ratings?.length} Reviews</p>
                                </div>
                                <a href='#review'>Write a review</a>
                            </div>
                            <div className='border-bottom py-3'>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Type: </h3> <p className='product-data'>Watch</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand: </h3> <p className='product-data'>{productState?.brand}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Category: </h3> <p className='product-data'>{productState?.category}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Tags: </h3> <p className='product-data'> {productState?.tags + " "} </p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Availability: </h3> <p className='product-data'>{productState?.quantity > 0 ? 'In Stock' : 'Unavailable'}</p>
                                </div>
                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h3 className='product-heading'>Size: </h3>
                                    <div className='d-flex flex-wrap gap-15'>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>S</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>M</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>L</span>
                                    </div>
                                </div>
                                {
                                    alreadyAdded === false && <>
                                        <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                            <h3 className='product-heading'>Color: </h3> <Color setColor={setColor} colorData={productState?.color} />
                                        </div>
                                    </>
                                }
                                <div className='d-flex gap-15 align-items-center flex-row mt-2 mb-3'>
                                    {
                                        alreadyAdded === false && <>
                                            <h3 className='product-heading'>Quantity: </h3>
                                            <div className=''>
                                                <input type='number' className='form-control' style={{ "width": "70px" }} min={1} max={10} onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                                            </div>
                                        </>
                                    }
                                    <div className='d-flex align-items-center gap-30 ms-4'>
                                        <button className='button border-0' type='button' onClick={() => {
                                            alreadyAdded ? navigate('/cart') : uploadCart()
                                        }}>{alreadyAdded ? "Go to Cart" : "Add to Cart"}</button>
                                        <button className='button signup border-0 align-items-center'>Buy It Now</button>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    <div>
                                        <a href='#compare-product'> <IoGitCompare className='fs-5 mb-2' /> Add to Compare</a>
                                    </div>
                                    <div>
                                        <button className='button-as-link' onClick={(e) => { addToWish(productState?._id) }}>
                                            <img src={wish} alt='wishlist' />Add to wishlist
                                        </button>
                                    </div>
                                </div>
                                <div className='d-flex gap-10 flex-column my-3'>
                                    <h3 className='product-heading'>Shipping & Returns: </h3> <p className='product-data'>Free Shipping. Eligible for Return, Refund or Replacement within 30 days of receipt. <b>5-10 business days!</b></p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Product Link: </h3>
                                    <button style={{ background: 'none', border: 'none', color: 'black', textDecoration: 'none', cursor: 'pointer', 'font-size': '14px' }} onClick={() => {
                                        copyToClipboard(window.location.href)
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

                            <p dangerouslySetInnerHTML={{ __html: productState?.description }}>

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
                                    {
                                        productState &&
                                        <ReactStars
                                            count={5}
                                            value={Number(productState.totalrating) || 0}
                                            size={24}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    }
                                        <p className='mb-0 t-review'>Based on {productState?.ratings?.length} Reviews</p>
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
                                <div className='reviews mt-4'>
                                    {productState?.ratings?.map((rating, index) => (
                                        <div className='review' key={index}>
                                            <div className='d-flex gap-10 align-items-center'>
                                                <h6 className='mb-0'>{rating?.postedBy?.firstname}</h6>
                                                <ReactStars
                                                    count={5}
                                                    value={!isNaN(rating.star) ? Number(rating.star) : 0}
                                                    size={24}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                />
                                            </div>
                                            <p className='mt-3'>{rating.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {/* <Container class1='popular-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h3 className='section-heading'>Our Popular Products</h3>
                    </div>
                </div>
                <div className="row">
                    {
                        productState && productState.filter(item => item.tags.includes('popular')).slice(0, 4).map((item, index) => {
                            return (
                                <SpecialProduct key={index} brand={item?.brand} title={item?.title} stars={item?.totalrating}
                                    price={item?.price} quantity={item?.quantity} image={item?.images[1].url} sold={item?.sold} />
                            )
                        })
                    }
                </div>
            </Container> */}
        </div>
    )
}

export default SingleProduct
