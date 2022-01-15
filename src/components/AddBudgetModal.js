import { useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useBudgets } from '../contexts/BudgetContext'

const AddBudgetModal = ({ show, handleClose }) => {
  const nameRef = useRef()
  const maxRef = useRef()
  const { addBudget } = useBudgets()

  const handleSubmit = (e) => {
    e.preventDefault()

    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    })

    handleClose()
  }

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Add
          </Button>
          <Button variant="outline-success" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddBudgetModal
