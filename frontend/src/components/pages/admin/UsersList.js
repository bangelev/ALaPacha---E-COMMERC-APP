import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { useDispatch, useSelector } from 'react-redux'
import { useSuccess, useError } from '../../../customHooks/alerts'

import {
  allUsers,
  deleteUser,
  clearError,
} from '../../../redux/actions/userActions'
import { DELETE_USER_RESET } from '../../../redux/constants/userConstants'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from './Sidebar'

const UsersList = () => {
  const alertSuccess = useSuccess()
  const alertError = useError()
  const dispatch = useDispatch()
  const { loading, error, users } = useSelector((state) => state.allUsers)
  const { error: deleteError, isDeleted } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(allUsers())
    if (isDeleted) {
      alertSuccess('User deleted successfully')
      dispatch({ type: DELETE_USER_RESET })
    }
    if (error) {
      alertError(error)
      dispatch(clearError())
    }
    if (deleteError) {
      alertError(deleteError)
      dispatch(clearError())
    }
    //eslint-disable-next-line
  }, [isDeleted, error])

  const setUsers = () => {
    const data = {
      // columns Array of objects
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }
    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link
              to={`/admin/users/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
              disabled={user && user.role === 'admin' ? true : false}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      })
    })
    return data
  }
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  return (
    <Fragment>
      <MetaData title={'All Users'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="container" id="sectionOne">
              <h1 className="my-5">All Users</h1>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setUsers()}
                  bordered
                  striped
                  hover
                  className="px-3"
                  responsiveSm
                />
              )}
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}

export default UsersList
