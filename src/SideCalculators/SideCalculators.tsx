import Calculator from "../Calculator/Calculator"
import type { Worker } from "../types"
import './SideCalculator.css'

interface CalculatorItem {
    id: number
}

interface SideCalculators {
    addCalculator: () => void
    delCalculator: (id: number) => void
    calculators: CalculatorItem[]
    onAddWorker: (worker: Worker) => void
}

export default function SideCalculators ({addCalculator, delCalculator, calculators, onAddWorker}: SideCalculators) {
    return (
        <div className="side-calculators">
            <button className="add-btn" onClick={addCalculator}>
                Добавить калькулятор
            </button>
            
            {calculators.map((calc) => (
                <div key={calc.id} className="calculator-wrapper">
                    <Calculator onAddWorker={onAddWorker} />
                    <button 
                        className="delete-btn"
                        onClick={() => delCalculator(calc.id)}
                    >
                        Удалить калькулятор #{calc.id}
                    </button>
                </div>
            ))}
        </div>
    )
}