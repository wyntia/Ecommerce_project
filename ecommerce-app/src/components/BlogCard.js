import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = (props) => {
  const {id, title, description, date ,image} = props;
  return (
      <div className='blog-card d-flex flex-column'>
        <div className='card-image'>
            <img src={image ? image : 'images/blog-1.jpg'} className='img-fluid w-100' alt='blog'/>
        </div>
        <div className='blog-content d-flex flex-column'>
            <p className='date'>{date}</p>
            <h5 className='title'>{title}</h5>
            <p className='desc' dangerouslySetInnerHTML={{__html: description?.substr(0,70)+ "..."}}></p>
            <div className="mt-auto">
                <Link to={'/blog/' + id} className='button'>Read More</Link>
            </div>
        </div>
      </div>
  )
}

export default BlogCard