import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts, clearError } from '../../redux/actions/productActions'
import { useError } from '../../customHooks/alerts'

import AccordionMenu from './AccordionMenu'
import ProductCard from './ProductCard'
import MetaData from '../layout/MetaData'

import Loader from '../layout/Loader'

const categories = [
  'breakfast',
  'salad',
  'pizza',
  'main course',
  'soup',
  'appetizer',
  'burger',
  'pasta',
  'see food',
  'dessert',
  'oven cooked',
  'alcoholic drink',
  'non-alcoholic drink',
]

const MenuPage = () => {
  const dispatch = useDispatch()
  const { loading, products, error } = useSelector((state) => state.products)

  const alertError = useError()

  useEffect(() => {
    dispatch(getAllProducts())
    if (error) {
      alertError(error)
      dispatch(clearError())
    }

    //eslint-disable-next-line
  }, [error])

  return (
    <>
      <MetaData title="Menu" />
      <div className="card mb-5 ">
        <img
          src="\images\sebastian-schuppik-H7xTpvBjJS4-unsplash.jpg"
          className="card-img-top"
          alt="..."
          style={{ height: '300px' }}
        />
        <div className="card-body text-center bg-dark text-light">
          <h2 className="card-title fw-4 fst-italic text-warning">
            La LaLaPacha MENU
          </h2>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        categories.map((category) => (
          <AccordionMenu category={category} key={category}>
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </AccordionMenu>
        ))
      )}
    </>
  )
}

export default MenuPage
