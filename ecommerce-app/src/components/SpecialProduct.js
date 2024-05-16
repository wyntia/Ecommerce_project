import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {
    const { brand, title, stars, price, quantity, image, sold } = props;
    return (
        <div className='col-6 mb-3'>
            <div className='special-product-card'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <img src={image ? image : 'images/watch.jpg'} className='product-image' alt='watch' />
                    </div>
                    <div className='special-product-content '>
                        <h5 className='brand'>{brand}</h5>
                        <h6 className='title'>{title}</h6>
                        <ReactStars
                            count={5}
                            value={Number(stars)}
                            size={24}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className='price'>
                            <span className='red-p'>{price}</span>&nbsp;<strike>$200</strike>
                        </p>
                        <div className='discount-till d-flex align-items-center gap-10'>
                            <p className='days mb-0'>
                                <b>5 </b>days
                            </p>
                            <div className='d-flex gap-10'>
                                <span className='badge rounded-circle p-3'>1</span>:
                                <span className='badge rounded-circle p-3'>1</span>:
                                <span className='badge rounded-circle p-3'>1</span>
                            </div>
                        </div>
                        <div className='prod-count my-3'>
                            <p>Products: {quantity}</p>
                            <div className="progress">
                                <div className="progress-bar" 
                                role="progressbar" style={{ width: (sold/ quantity) * 100 }} 
                                aria-valuenow={(sold/ quantity) * 100} 
                                aria-valuemin="0"
                                aria-valuemax="100"></div>
                            </div>
                        </div>
                        <Link className='button'>Add to Cart</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct
