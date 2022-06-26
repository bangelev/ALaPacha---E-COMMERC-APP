import React from 'react'
import Sidebar from './Sidebar'
import MetaData from '../../layout/MetaData'

const Events = () => {
  return (
    <>
      <MetaData title={'Events'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div id="sectionTwo" className="col-md-8 mt-5">
          <h1 className="text-center fs-1">Coming soon.....</h1>
        </div>
      </div>
    </>
  )
}

export default Events
