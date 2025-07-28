import type { Worker } from "../types"
import './WorkerCard.css'

interface workers {
    workers: Worker[]
}

export default function WorkerCard ({workers}:workers) {

    return (
        <div className="wworkers-section">
                <h2 className="wworkers-title">Список работников</h2>
                <div className="wworkers-list">
                    {workers.map((worker, index) => (
                        <div key={index} className="wworker-card">
                            <h3 className="wworker-name">{worker.name}</h3>
                            <p className="wworker-info">Дата: {worker.date}</p>
                            <p className="wworker-info">Выручка: {worker.cash.toFixed(2)}</p>
                            <p className="wworker-info">Ставка: {worker.bet.toFixed(2)}</p>
                            <p className="wworker-info">Процент: {worker.percent}%</p>
                            <p className="wworker-salary">Зарплата: {worker.salary.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
    )
}