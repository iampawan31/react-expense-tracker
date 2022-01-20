import { useRef } from 'react'
import { Modal, Button, Form, Stack } from 'react-bootstrap'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext'

const AddExpenseModal = ({ budget, show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { addExpense, budgets } = useBudgets()

  const handleSubmit = (e) => {
    e.preventDefault()

    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })

    handleClose()
  }

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap={2}>
              <div>Expenses - {budget.name}</div>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              defaultValue={defaultBudgetId}
              ref={budgetIdRef}
              required
            >
              <option
                key={UNCATEGORIZED_BUDGET_ID}
                value={UNCATEGORIZED_BUDGET_ID}
              >
                Uncategorized
              </option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
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

export default AddExpenseModal
