import Calculator from "../Calculator/Calculator"
import type { Worker } from "../types"
import './SideCalculators.css'

interface CalculatorItem {
    id: number
}

interface SideCalculators {
    isOpen: boolean
    onClose: () => void
    addCalculator: () => void
    delCalculator: (id: number) => void
    calculators: CalculatorItem[]
    onAddWorker: (worker: Worker) => void
}

export default function SideCalculators ({
    isOpen,
    onClose,
    addCalculator,
    delCalculator,
    calculators,
    onAddWorker
}: SideCalculators) {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="sidebar-toggle" onClick={onClose}>
                {isOpen ? '×' : '☰'}
            </button>
            
            <div className="side-calculators">
                <h3>Калькуляторы</h3>
                <button className="add-btn" onClick={addCalculator}>
                    + Добавить
                </button>
                
                {calculators.map((calc) => (
                    <div key={calc.id} className="calculator-wrapper">
                        <Calculator onAddWorker={onAddWorker} isSidebar={true} />
                        <button 
                            className="delete-btn"
                            onClick={() => delCalculator(calc.id)}
                        >
                            Удалить #{calc.id}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}