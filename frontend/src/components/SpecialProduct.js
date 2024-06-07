import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {
    const { brand, title, stars, price, quantity, image, sold, id } = props;
    const [time, setTime] = useState(5 * 60 * 60 * 1000); // 5 hours in milliseconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1000);
        }, 1000);

        return () => clearInterval(timer); // cleanup on unmount
    }, []);

    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time / (60 * 1000)) % 60);
    const seconds = Math.floor((time / 1000) % 60);

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
                                <span className='badge1 rounded-circle p-3'>{hours}</span>:
                                <span className='badge1 rounded-circle p-3'>{minutes}</span>:
                                <span className='badge1 rounded-circle p-3'>{seconds}</span>
                            </div>
                        </div>
                        <div className='prod-count my-3'>
                            <p>Products: {quantity}</p>
                            <div className="progress">
                                <div className="progress-bar"
                                    role="progressbar" style={{ width: (sold / quantity) * 100 }}
                                    aria-valuenow={(sold / quantity) * 100}
                                    aria-valuemin="0"
                                    aria-valuemax="100"></div>
                            </div>
                        </div>
                        <Link className='button' to={'/product/' + id}>View</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct
