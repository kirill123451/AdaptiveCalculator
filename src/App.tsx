import './App.css'
import { useState } from 'react'
import Calculator from './Calculator/Calculator'
import Header from './Header/Header'
import TableWorkers from './TableWorkers/TableWorkers'
import type { Worker } from './types'

function App() {
  const [workers, setWorkers] = useState<Worker[]>([])

  return (
    <div className='App'>
      <Header />
      <Calculator onAddWorker={(worker) => setWorkers(p => [...p, worker])} workers={workers} />
      <TableWorkers workers={workers} />
    </div>
  )
}

export default App
