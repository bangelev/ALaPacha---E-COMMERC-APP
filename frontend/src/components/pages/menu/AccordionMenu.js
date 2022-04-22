import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

const AccordionMenu = ({ category, children }) => {
  return (
    <>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey={category}>
          <Accordion.Header>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Accordion.Header>
          <Accordion.Body className="bg-dark">
            <div className="container">
              <div className="row">{children}</div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default AccordionMenu
