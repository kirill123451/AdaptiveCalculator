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

  const handleAddWorker = (worker: Omit<Worker, 'id'>) => {
    setWorkers(prev => [
      ...prev,
      {
        ...worker,
        id: Date.now() 
      }
    ])
  }

  const handleDeleteWorker = (id: number) => {
    setWorkers(prev => prev.filter(worker => worker.id !== id))
  }

  const handleUpdateWorker = (updatedWorker: Worker) => {
    setWorkers(prev => 
      prev.map(worker => 
        worker.id === updatedWorker.id ? updatedWorker : worker
      )
    )
  }

  const addCalculator = () => {
    const newId = calculators.length > 0 ? Math.max(...calculators.map(c => c.id)) + 1 : 1
    setCalculators([...calculators, { id: newId }])
  }

  const delCalculator = (id: number) => {
    setCalculators(calculators.filter(c => c.id !== id))
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
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
                <Calculator onAddWorker={handleAddWorker} />
                <WorkerCard workers={workers} />
              </>
            }
          />
          <Route
            path="/table"
            element={
              <div className="table-page">
                <div className={`table-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                  <TableWorkers 
                    workers={workers} 
                    onDeleteWorker={handleDeleteWorker}
                    onUpdateWorker={handleUpdateWorker}
                  />
                  <SideCalculators
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                    addCalculator={addCalculator}
                    delCalculator={delCalculator}
                    calculators={calculators}
                    onAddWorker={handleAddWorker}
                  />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App