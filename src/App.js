import './App.css'
import { Stack, Container, Button } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import ViewExpensesModal from './components/ViewExpensesModal'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import { useState } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext'
import TotalBudgetCard from './components/TotalBudgetCard'

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(null)
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState(null)
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false)
  const { budgets, getBudgetExpenses } = useBudgets()

  const openAddExpenseModal = (budgetId) => {
    setAddExpenseModalBudgetId(budgetId)
    setShowAddExpenseModal(true)
  }

  const openViewExpensesModal = (budgetId) => {
    setViewExpenseModalBudgetId(budgetId)
    setShowViewExpensesModal(true)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="success" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-success" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => openViewExpensesModal(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal()}
            onViewExpensesClick={() =>
              openViewExpensesModal(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpensesModal
        show={showViewExpensesModal}
        handleClose={() => {
          setShowViewExpensesModal(false)
          setViewExpenseModalBudgetId(null)
        }}
        budgetId={viewExpenseModalBudgetId}
      />
    </>
  )
}

export default App
