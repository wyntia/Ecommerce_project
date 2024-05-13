import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import blog from '../images/blog-1.jpg'
import Container from '../components/Container';

const SingleBlog = () => {
    return (
        <div>
            <Meta title={'Dynamic Blog Name'} />
            <BreadCrumb title='Dynamic Blog Name' />
            <Container class1='blog-wrapper home-wrapper-2 py-5 '>
                <div className='row'>
                    <div className='col-12'>
                        <div className='single-blog-card'>
                            <Link to='/blogs' className='d-flex align-items-center gap-10'><FaArrowLeftLong className='fs-4' />Go back to blogs</Link>
                            <h3 className='title'>Nie komplikuj swojego kodu. Dependency Injection w iOS</h3>
                            <img src={blog} alt='blog' className='img-fluid w-100 my-4' />
                            <p>
                                Dependency Injection, DI, wstrzykiwanie zależności – wszystkie te określenia na pewno zna, lub chociaż słyszał o nich niemal każdy adept programowania, bez względu na technologię, stopień wtajemniczenia czy światopogląd. Przez ostatnie lata powstało tyle artykułów, opracowań czy rozważań na temat DI, że chyba zostało już na jego temat napisane niemal wszystko i nie ma potrzeby pisać ani mówić nic więcej. A jednak…
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SingleBlog
