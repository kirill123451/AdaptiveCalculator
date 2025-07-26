import { useState, useEffect } from "react"
import "./Calculator.css"
import type { Worker } from '../types'

interface CalculatorProps {
  onAddWorker: (worker: Worker) => void
  workers: Worker[]
}

export default function Calculator({ onAddWorker, workers }: CalculatorProps) {
    const [mode, setMode] = useState<string>('base')
    const [date, setDate] = useState<string>('')
    const [worker, setWorker] = useState<string>('')
    const [cash, setCash] = useState<number | ''>('')
    const [bet, setBet] = useState<number | ''>('')
    const [percent, setPercent] = useState<number | ''>('')
    const [salary, setSalary] = useState<number>(0)

    useEffect(() => {
        const cashValue = cash === '' ? 0 : cash
        const betValue = bet === '' ? 0 : bet
        const percentValue = percent === '' ? 0 : percent
        const calculatedSalary = calculateSalary({ 
            cash: cashValue as number, 
            bet: betValue as number, 
            percent: percentValue as number 
        })
        setSalary(calculatedSalary)
    }, [cash, bet, percent])

    function handleChangeDate(e: React.ChangeEvent<HTMLInputElement>) {
        const inputDate = e.target.value
        const [year, month, day] = inputDate.split('-')
        setDate(`${day}.${month}.${year}`)
    }

    const calculateSalary = ({ cash, bet, percent }: { cash: number, bet: number, percent: number }) => {
        return bet + (cash * (percent / 100))
    }

    const addWorker = () => {
        if (!worker || !date) return
        
        const cashValue = cash === '' ? 0 : cash
        const betValue = bet === '' ? 0 : bet
        const percentValue = percent === '' ? 0 : percent
        
        onAddWorker({
            date,
            name: worker,
            cash: cashValue as number,
            bet: betValue as number,
            percent: percentValue as number,
            salary: salary
        })

        setWorker('')
    }

    const clearData = () => {
        setDate('')
        setWorker('')
        setCash('')
        setPercent('')
        setBet('')
    }

    const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCash(e.target.value === '' ? '' : Number(e.target.value))
    }

    const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBet(e.target.value === '' ? '' : Number(e.target.value))
    }

    const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPercent(e.target.value === '' ? '' : Number(e.target.value))
    }

    return (
        <div className="calculator-container">
            <div className="form-section">
                {mode === 'base' ? (
                    <div className="input-form">
                        <div className="input-group">
                            <label className="input-label">Дата:</label>
                            <input
                                className="date-input"
                                type="date"
                                onChange={handleChangeDate}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Работник:</label>
                            <input 
                                className="text-input"
                                type="text" 
                                value={worker}
                                onChange={(e) => setWorker(e.target.value)}
                                placeholder="Введите имя"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Выручка за день:</label>
                            <input 
                                className="number-input"
                                type="number"
                                value={cash}
                                onChange={handleCashChange}
                                placeholder="0"
                                min="0"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Ставка:</label>
                            <input 
                                className="number-input"
                                type="number"
                                value={bet}
                                onChange={handleBetChange}
                                placeholder="0"
                                min="0"
                            /> 
                        </div>
                        <div className="input-group">
                            <label className="input-label">Процент:</label>
                            <input
                                className="number-input"
                                type="number"
                                value={percent}
                                onChange={handlePercentChange}
                                placeholder="0"
                                min="0"
                                max="100"
                            />
                        </div>
                        <div className="button-group">
                            <button 
                                className="add-button-clear" 
                                onClick={clearData}
                            >
                                Очистить
                            </button>
                            <button 
                                className="add-button-complete" 
                                onClick={addWorker}
                                disabled={!worker || !date}
                            >
                                Добавить работника
                            </button>
                        </div>
                        <div>
                            {(cash !== '' || bet !== '' || percent !== '') && (
                                <p className="salary-display">
                                    Зарплата: {salary.toFixed(2)}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <span className="alt-mode">Привет2</span>
                )}
            </div>
            <div className="workers-section">
                <h2 className="workers-title">Список работников</h2>
                <div className="workers-list">
                    {workers.map((worker, index) => (
                        <div key={index} className="worker-card">
                            <h3 className="worker-name">{worker.name}</h3>
                            <p className="worker-info">Дата: {worker.date}</p>
                            <p className="worker-info">Выручка: {worker.cash.toFixed(2)}</p>
                            <p className="worker-info">Ставка: {worker.bet.toFixed(2)}</p>
                            <p className="worker-info">Процент: {worker.percent}%</p>
                            <p className="worker-salary">Зарплата: {worker.salary.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}