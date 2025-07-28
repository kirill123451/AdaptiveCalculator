import type { Worker } from "../types"
import './WorkerCard.css'

interface workers {
    workers: Worker[]
}

export default function WorkerCard ({workers}:workers) {

    return (
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
    )
}