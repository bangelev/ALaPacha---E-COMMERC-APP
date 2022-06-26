import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useSuccess, useError } from '../../../customHooks/alerts'

import MetaData from '../../layout/MetaData'
import Sidebar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../../redux/constants/productConstants'

import { useDispatch, useSelector } from 'react-redux'
import {
  getProductDetails,
  updateProduct,
  clearError,
} from '../../../redux/actions/productActions'

const EditProduct = () => {
  const { id } = useParams()

  const alertSuccess = useSuccess()
  const alertError = useError()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { error, product } = useSelector((state) => state.productDetails)

  const {
    error: updateError,
    loading,
    isUpdated,
  } = useSelector((state) => state.product)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

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
  //   const alert = useAlert()

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id))
    } else {
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setCategory(product.category)
      setOldImages(product.images)
    }

    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    if (updateError) {
      alertError(updateError)
      dispatch(clearError())
    }
    if (isUpdated) {
      navigate('/admin/products')
      alertSuccess('Product updated successfully')
      dispatch({ type: UPDATE_PRODUCT_RESET })
    }
    //eslint-disable-next-line
  }, [error, navigate, id, product, isUpdated])

  //handlers
  const submitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.set('name', name)
    formData.set('price', price)
    formData.set('description', description)
    formData.set('category', category)

    images.forEach((image) => {
      formData.append('images', image)
    })

    dispatch(updateProduct(formData, id))
  }

  const onChangeHandler = (e) => {
    const files = Array.from(e.target.files)

    //In case user load two times before submitting

    setImagesPreview([])
    setImages([])
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result])
          setImages((oldArray) => [...oldArray, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <Fragment>
      <MetaData title={'Edit Product'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                encType="multipart/form-data"
                onSubmit={submitHandler}
              >
                <h1 className="mb-4">Edit Product</h1>
                <div className="form-group my-2">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group my-2">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      multiple
                      onChange={onChangeHandler}
                    />
                  </div>
                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        src={img.url}
                        key={img}
                        alt="Old Preview"
                        width="55"
                        height="52"
                        className="mt-3 mr-2"
                      ></img>
                    ))}
                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      width="55"
                      height="52"
                      className="mt-3 me-2"
                    ></img>
                  ))}
                </div>
                <div className="d-grid gap-2">
                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-1"
                    disabled={loading ? true : false}
                  >
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}

export default EditProduct
