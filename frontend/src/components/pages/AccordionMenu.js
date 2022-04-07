import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

const AccordionMenu = ({ category, children }) => {
  return (
    <>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey={category}>
          <Accordion.Header className="ProductOne">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Accordion.Header>
          <Accordion.Body className="">
            <div className="container">
              <div className="row">
                {/* {products
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <Product key={product._id} product={product} />
                  ))} */}
                {children}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default AccordionMenu
