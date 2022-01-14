import './App.css'
import { Stack, Container, Button } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'

const App = () => {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="success" onClick={() => console.log('Primary')}>
          Add Budget
        </Button>
        <Button
          variant="outline-success"
          onClick={() => console.log('Primary')}
        >
          Add Budget
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
        <BudgetCard name="Entertainment" amount={1000} max={3000}></BudgetCard>
      </div>
    </Container>
  )
}

export default App
