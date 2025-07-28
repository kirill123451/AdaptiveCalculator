import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { Worker } from '../types'
import './TableWorkers.css'

interface WorkersTableProps {
  workers: Worker[]
  onDeleteWorker: (id: number) => void
  onUpdateWorker: (updatedWorker: Worker) => void
}

export default function TableWorkers({ workers, onDeleteWorker, onUpdateWorker }: WorkersTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<Worker>>({})

  const startEditing = (worker: Worker) => {
    setEditingId(worker.id)
    setEditData({ ...worker })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditData({})
  }

  const saveEditing = () => {
    if (editingId && editData) {
      onUpdateWorker({
        id: editingId,
        name: editData.name || '',
        date: editData.date || '',
        cash: editData.cash || 0,
        bet: editData.bet || 0,
        percent: editData.percent || 0,
        salary: (editData.bet || 0) + ((editData.cash || 0) * (editData.percent || 0) / 100)
      })
      cancelEditing()
    }
  }

  const handleEditChange = (field: keyof Worker, value: any) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return ''
    const parts = dateString.split('.')
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    }
    return dateString
  }

  const parseDateFromInput = (dateString: string) => {
    const parts = dateString.split('-')
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`
    }
    return dateString
  }

  const columns: ColumnDef<Worker>[] = [
    {
      accessorKey: 'name',
      header: 'Имя работника',
      cell: ({ row }) => (
        editingId === row.original.id ? (
          <input
            value={editData.name || ''}
            onChange={(e) => handleEditChange('name', e.target.value)}
            className="workers-table-edit-input"
            aria-label="Edit worker name"
          />
        ) : (
          <div className="workers-table-cell-content">{row.original.name}</div>
        )
      ),
    },
    {
      accessorKey: 'date',
      header: 'Дата',
      cell: ({ row }) => (
        editingId === row.original.id ? (
          <input
            type="date"
            value={formatDateForInput(editData.date)}
            onChange={(e) => handleEditChange('date', parseDateFromInput(e.target.value))}
            className="workers-table-edit-input"
            aria-label="Edit date"
          />
        ) : (
          <div className="workers-table-cell-content">{row.original.date}</div>
        )
      ),
    },
    {
      accessorKey: 'cash',
      header: 'Выручка',
      cell: ({ row }) => (
        editingId === row.original.id ? (
          <input
            type="number"
            value={editData.cash || ''}
            onChange={(e) => handleEditChange('cash', Number(e.target.value))}
            className="workers-table-edit-input workers-table-number-input"
            aria-label="Edit cash amount"
            min="0"
            step="0.01"
          />
        ) : (
          <div className="workers-table-cell-content workers-table-number-value">
            {row.original.cash.toFixed(2)}
          </div>
        )
      ),
    },
    {
      accessorKey: 'bet',
      header: 'Ставка',
      cell: ({ row }) => (
        editingId === row.original.id ? (
          <input
            type="number"
            value={editData.bet || ''}
            onChange={(e) => handleEditChange('bet', Number(e.target.value))}
            className="workers-table-edit-input workers-table-number-input"
            aria-label="Edit bet amount"
            min="0"
            step="0.01"
          />
        ) : (
          <div className="workers-table-cell-content workers-table-number-value">
            {row.original.bet.toFixed(2)}
          </div>
        )
      ),
    },
    {
      accessorKey: 'percent',
      header: 'Процент (%)',
      cell: ({ row }) => (
        editingId === row.original.id ? (
          <input
            type="number"
            value={editData.percent || ''}
            onChange={(e) => handleEditChange('percent', Number(e.target.value))}
            className="workers-table-edit-input workers-table-number-input"
            aria-label="Edit percentage"
            min="0"
            max="100"
          />
        ) : (
          <div className="workers-table-cell-content workers-table-number-value">
            {row.original.percent}
          </div>
        )
      ),
    },
    {
      accessorKey: 'salary',
      header: 'Зарплата',
      cell: ({ row }) => (
        <div className={`workers-table-cell-content workers-table-number-value workers-table-highlight`}>
          {editingId === row.original.id ? 
            ((editData.bet || 0) + ((editData.cash || 0) * (editData.percent || 0) / 100)).toFixed(2) :
            row.original.salary.toFixed(2)
          }
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="workers-table-action-buttons">
          {editingId === row.original.id ? (
            <>
              <button 
                onClick={saveEditing} 
                className="workers-table-button workers-table-save-button"
                aria-label="Save changes"
              >
                Сохранить
              </button>
              <button 
                onClick={cancelEditing} 
                className="workers-table-button workers-table-cancel-button"
                aria-label="Cancel editing"
              >
                Отмена
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => startEditing(row.original)} 
                className="workers-table-button workers-table-edit-button"
                aria-label="Edit worker"
              >
                Редактировать
              </button>
              <button 
                onClick={() => onDeleteWorker(row.original.id)} 
                className="workers-table-button workers-table-delete-button"
                aria-label="Delete worker"
              >
                Удалить
              </button>
            </>
          )}
        </div>
      ),
    }
  ]
  
  const table = useReactTable({
    data: workers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="workers-table-container">
      <table className="workers-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="workers-table-header">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr 
              key={row.id} 
              className={index % 2 === 0 ? 'workers-table-row-even' : 'workers-table-row-odd'}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="workers-table-cell">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}