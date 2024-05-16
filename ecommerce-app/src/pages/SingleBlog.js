import React,  { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import blog from '../images/blog-1.jpg'
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../features/blogs/blogSlice';

const SingleBlog = () => {

    const blogState = useSelector((state) => state?.blog?.singleblog);
    const location = useLocation();
    const getBlogId = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    useEffect(() => {
        getaBlog();
    }, []);
    const getaBlog = () => {
        dispatch(getBlog(getBlogId));
    };

    return (
        <div>
            <Meta title={blogState?.title} />
            <BreadCrumb title={blogState?.title} />
            <Container class1='blog-wrapper home-wrapper-2 py-5 '>
                <div className='row'>
                    <div className='col-12'>
                        <div className='single-blog-card'>
                            <Link to='/blogs' className='d-flex align-items-center gap-10'><FaArrowLeftLong className='fs-4' />Go back to blogs</Link>
                            <h3 className='title'>{blogState?.title}</h3>
                            <img src={blogState?.image} alt='blog' className='img-fluid w-100 my-4' />
                            <p dangerouslySetInnerHTML={{__html: blogState?.description}}>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SingleBlog
