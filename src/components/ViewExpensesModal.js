import { Modal, Button, Stack } from 'react-bootstrap'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext'
import { currencyFormatter } from '../utils'

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { budgets, deleteBudget, getBudgetExpenses, deleteExpense } =
    useBudgets()

  const expenses = getBudgetExpenses(budgetId)

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId)

  return (
    <Modal centered show={budgetId !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Expenses - {budget?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={3}>
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        {budgetId !== UNCATEGORIZED_BUDGET_ID ? (
          <Button
            variant="outline-danger"
            onClick={() => {
              deleteBudget(budget)
              handleClose()
            }}
          >
            Delete
          </Button>
        ) : null}
        <Button variant="outline-success" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewExpensesModal
