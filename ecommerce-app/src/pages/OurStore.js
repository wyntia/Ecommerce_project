import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state.product.product);
  const [brands, setBrands] = useState([null]);
  const [categories, setCategories] = useState([null]);
  const [tags, setTags] = useState([null]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    let newBrands = [];
    let Categories = [];
    let Tags = [];
    for (let i = 0; i < productState?.length; i++) {
      const element = productState[i];
      newBrands.push(element.brand);
      Categories.push(element.category);
      Tags.push(...element.tags);
    }
    setBrands(newBrands);
    setCategories(Categories);
    setTags(Tags);
  }, [productState])

  useEffect(() => {
    getProducts();
  }, [sort,tags,brands,categories,minPrice,maxPrice]);
  const getProducts = () => {
    dispatch(getAllProducts({sort,tags,brands,categories,minPrice,maxPrice}));
  };
  //strona wywoluje sie w nieskonczonosc (to znaczy ze mam nieskonczona ilosc console.log jak je wywolam w Service)
// brands nie sa pokazywane na stronie
  return (
    <>
      <Meta title={'Our Store'} />
      <BreadCrumb title='Our Store' />
      <Container class1='store-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-3'>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>
                Shop By Brands
              </h3>
              <ul className='ps-0'>
                {
                  brands && [...new Set(brands)].map((brand, index) => {
                    return (
                      <li key={index} onClick={() => setBrands(brand)}>{brand}</li>
                    )
                  
                  })
                }
              </ul>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>
                Shop By Categories
              </h3>
              <ul className='ps-0'>
                {
                  brands && [...new Set(categories)].map((category, index) => {
                    return (
                      <li key={index} onClick={() => setCategories(category)}>{category}</li>
                    )
                  
                  })
                }
              </ul>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>
                Filter By
              </h3>
              <div>
                <h5 className='sub-title'>Price</h5>
                <div className='d-flex align-items-center gap-10'>
                  <div className="form-floating">
                    <input type="number" className="form-control" id="floatingInput" placeholder="From" onChange={(e) => setMinPrice(e.target.value)}/>
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input type="number" className="form-control" id="floatingInput1" placeholder="To" onChange={(e) => setMaxPrice(e.target.value)}/>
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <h5 className='sub-title'>Size</h5>
                <div>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id='color-1' />
                    <label className='form-check-label' htmlFor='color-1'>S (2) </label>
                  </div>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id='color-2' />
                    <label className='form-check-label' htmlFor='color-2'>M (2)</label>
                  </div>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id='color-3' />
                    <label className='form-check-label' htmlFor='color-3'>L (2)</label>
                  </div>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id='color-4' />
                    <label className='form-check-label' htmlFor='color-4'>XL (2)</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>
                Product Tags
              </h3>
              <div>
                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                  {
                    tags && [...new Set(tags)].map((tag, index) => {
                      return (
                        <span onClick={() => setTags(tag)} key={index} className='text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3'>{tag}</span>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='col-9'>
            <div className='filter-sort-grid mb-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-10'>
                  <p className='mb-0 d-block' style={{ width: "100px" }}>Sort By:</p>
                  <select name='' defaultValue={'manual'} className='form-control form-select' id='' onChange={(e)=> setSort(e.target.value)}>
                    <option value='manual'>Featured</option>
                    <option value='title'>Alpabetically, A-Z</option>
                    <option value='-title'>Alpabetically, Z-A</option>
                    <option value='price'>Price, low to high</option>
                    <option value='-price'>Price, high to low</option>
                    <option value='createdAt'>Date, old to new</option>
                    <option value='-createdAt'>Date, new to old</option>
                  </select>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <p className='totalproducts mb-0' >21 Products</p>
                  <div className='d-flex gap-10 align-items-center grid'>
                    <img onClick={() => {
                      setGrid(3);
                    }} src='images/gr4.svg' className='d-block img-fluid' alt='grid' />
                    <img onClick={() => {
                      setGrid(4);
                    }} src='images/gr3.svg' className='d-block img-fluid' alt='grid' />
                    <img onClick={() => {
                      setGrid(6);
                    }} src='images/gr2.svg' className='d-block img-fluid' alt='grid' />
                    <img onClick={() => {
                      setGrid(12);
                    }} src='images/gr.svg' className='d-block img-fluid' alt='grid' />
                  </div>
                </div>
              </div>
            </div>
            <div className='products-list pb-5'>
              <div className='d-flex gap-10 flex-wrap'>
                <ProductCard data={productState} grid={grid} />
              </div>
            </div>
          </div>
        </div >
      </Container>

    </>
  )
}

export default OurStore
