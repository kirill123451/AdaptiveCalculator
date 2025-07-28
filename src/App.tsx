import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Calculator from './Calculator/Calculator'
import Header from './Header/Header'
import TableWorkers from './TableWorkers/TableWorkers'
import WorkerCard from './WorkerCard/WorkerCard'
import SideCalculators from './SideCalculators/SideCalculators'
import type { Worker } from './types'
import './App.css'

function App() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [calculators, setCalculators] = useState([{ id: 1 }])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const addCalculator = () => {
    const newId = calculators.length > 0 ? Math.max(...calculators.map(c => c.id)) + 1 : 1
    setCalculators([...calculators, { id: newId }])
  }

  const delCalculator = (id: number) => {
    setCalculators(calculators.filter(c => c.id !== id))
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Calculator onAddWorker={(worker) => setWorkers(p => [...p, worker])} />
                <WorkerCard workers={workers} />
              </>
            }
          />
          <Route
            path="/table"
            element={
              <>
                <TableWorkers 
                  workers={workers} 
                  onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} 
                />
                {isSidebarOpen && (
                  <SideCalculators
                    addCalculator={addCalculator}
                    delCalculator={delCalculator}
                    calculators={calculators}
                    onAddWorker={(worker) => setWorkers(p => [...p, worker])}
                  />
                )}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App