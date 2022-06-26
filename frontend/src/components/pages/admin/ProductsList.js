import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import {
  adminProducts,
  deleteProduct,
  clearError,
} from '../../../redux/actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../../redux/constants/productConstants'
import { useError, useSuccess } from '../../../customHooks/alerts'

const ProductsList = () => {
  const alertError = useError()
  const alertSuccess = useSuccess()
  const dispatch = useDispatch()
  const { loading, products, error } = useSelector((state) => state.products)
  const {
    loading: deleteLoad,
    isDeleted,
    error: deleteError,
  } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(adminProducts())

    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    if (deleteError) {
      alertError(deleteError)
      dispatch(clearError())
    }
    if (isDeleted) {
      alertSuccess('Product is successfully deleted')
      dispatch({ type: DELETE_PRODUCT_RESET })
    }
    // eslint-disable-next-line
  }, [dispatch, error, isDeleted])
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }
  const setProducts = () => {
    const data = {
      // columns Array of objects
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name ',
          field: 'name',
          sort: 'asc',
          width: '50px',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    }

    products.forEach((product) => {
      data.rows.push({
        id: product._id,

        name: product.name,
        price: `$ ${product.price}`,
        category: product.category,
        actions: (
          <Fragment>
            <Link
              to={`/admin/products/${product._id}`}
              className="btn btn-primary py-1 px-2 me-2"
            >
              <i className="bi bi-pencil-square"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              disabled={deleteLoad ? true : false}
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </Fragment>
        ),
      })
    })
    return data
  }

  return (
    <Fragment>
      <MetaData title={'All Products'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <h2 id="sectionOne">All Products</h2>
              <MDBDataTable
                data={setProducts()}
                className="mx-3"
                bordered
                striped
                hover
                responsiveSm
              />
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProductsList
