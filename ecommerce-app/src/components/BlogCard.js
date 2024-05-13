import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
  return (

      <div className='blog-card'>
        <div className='card-image'>
            <img src='images/blog-1.jpg' className='img-fluid w-100'alt='blog'/>
        </div>
        <div className='blog-content'>
            <p className='date'>01.12.2023</p>
            <h5 className='title'>Coś tam</h5>
            <p className='desc'>Lorem ipsum dolor sit bla bvla sad asd wq</p>
            <Link to='/blog/:id' className='button'>Read More</Link>
        </div>
      </div>

  )
}

export default BlogCard
