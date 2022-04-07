import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const AlertDismissible = ({ variant, message }) => {
  const [show, setShow] = useState(true)
  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{message}</p>
      </Alert>
    )
  }
  return null
}

export default AlertDismissible
