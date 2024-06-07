import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state.product.product);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState('manual'); // Dodajemy stan dla sortowania

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(productState)) {
      let newCategories = [];
      let newTags = [];
      for (let element of productState) {
        newCategories.push(element.category);
        newTags.push(...element.tags);
      }
      setCategories(Array.from(new Set(newCategories)));
      setTags(Array.from(new Set(newTags)));
    }
  }, [productState]);

  const toggleSelection = (selection, setSelection, item) => {
    setSelection((prevSelection) =>
      prevSelection.includes(item)
        ? prevSelection.filter((i) => i !== item)
        : [...prevSelection, item]
    );
  };

  const filteredProducts = Array.isArray(productState) ? productState.filter((product) => {
    const brandMatch = selectedBrands.length ? selectedBrands.includes(product.brand) : true;
    const categoryMatch = selectedCategories.length ? selectedCategories.includes(product.category) : true;
    const tagMatch = selectedTags.length ? product.tags.some(tag => selectedTags.includes(tag)) : true;
    const priceMatch = (minPrice ? product.price >= minPrice : true) && (maxPrice ? product.price <= maxPrice : true);

    return brandMatch && categoryMatch && tagMatch && priceMatch;
  }) : [];

  // Sortowanie produktów
  const sortedProducts = [...filteredProducts];
  if (sort === 'title') {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === '-title') {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === 'price') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === '-price') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'createdAt') {
    sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === '-createdAt') {
    sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <>
      <Meta title={'Our Store'} />
      <BreadCrumb title='Our Store' />
      <Container class1='store-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-3'>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Shop By Brands</h3>
              <ul className='ps-0'>
                {
                  Array.isArray(productState) && [...new Set(productState.map(product => product.brand))].map((brand, index) => (
                    <li
                      key={index}
                      onClick={() => toggleSelection(selectedBrands, setSelectedBrands, brand)}
                      style={{ cursor: 'pointer', textDecoration: selectedBrands.includes(brand) ? 'underline' : 'none' }}
                    >
                      {brand}
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Shop By Categories</h3>
              <ul className='ps-0'>
                {
                  Array.isArray(categories) && categories.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => toggleSelection(selectedCategories, setSelectedCategories, category)}
                      style={{ cursor: 'pointer', textDecoration: selectedCategories.includes(category) ? 'underline' : 'none' }}
                    >
                      {category}
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Filter By</h3>
              <div>
                <h5 className='sub-title'>Price</h5>
                <div className='d-flex align-items-center gap-10'>
                  <div className="form-floating">
                    <input type="number" className="form-control" id="floatingInput" placeholder="From" onChange={(e) => setMinPrice(e.target.value)} />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input type="number" className="form-control" id="floatingInput1" placeholder="To" onChange={(e) => setMaxPrice(e.target.value)} />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Product Tags</h3>
              <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                {
                  Array.isArray(tags) && tags.map((tag, index) => (
                    <span
                      key={index}
                      onClick={() => toggleSelection(selectedTags, setSelectedTags, tag)}
                      className={`text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 ${selectedTags.includes(tag) ? 'badge-primary' : ''}`}
                      style={{ cursor: 'pointer', textDecoration: selectedTags.includes(tag) ? 'underline' : 'none' }}
                    >
                      {tag}
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='col-9'>
            <div className='filter-sort-grid mb-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-10'>
                  <p className='mb-0 d-block' style={{ width: "100px" }}>Sort By:</p>
                  <select
                    name=''
                    value={sort} // Zmiana defaultValue na value
                    className='form-control form-select'
                    id=''
                    onChange={(e) => {
                      console.log(e.target.value); // Dodajemy console.log
                      setSort(e.target.value);
                    }}
                  >                    <option value='manual'>Featured</option>
                    <option value='title'>Alphabetically, A-Z</option>
                    <option value='-title'>Alphabetically, Z-A</option>
                    <option value='price'>Price, low to high</option>
                    <option value='-price'>Price, high to low</option>
                    <option value='createdAt'>Date, old to new</option>
                    <option value='-createdAt'>Date, new to old</option>
                  </select>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <p className='totalproducts mb-0'>{filteredProducts.length} Products</p>
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
                <ProductCard data={sortedProducts} grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
