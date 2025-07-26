import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { Worker } from '../types'
import './TableWorkers.css' 

interface WorkersTableProps {
  workers: Worker[]
}

export default function TableWorkers({ workers }: WorkersTableProps) {
  const columns: ColumnDef<Worker>[] = [
    {
      accessorKey: 'name',
      header: 'Имя работника',
      cell: ({ row }) => <div className="centered-cell">{row.original.name}</div>,
    },
    {
      accessorKey: 'date',
      header: 'Дата',
      cell: ({ row }) => <div className="centered-cell">{row.original.date}</div>,
    },
    {
      accessorKey: 'cash',
      header: 'Выручка',
      cell: ({ row }) => <div className="centered-cell number-value">{row.original.cash.toFixed(2)}</div>,
    },
    {
      accessorKey: 'bet',
      header: 'Ставка',
      cell: ({ row }) => <div className="centered-cell number-value">{row.original.bet.toFixed(2)}</div>,
    },
    {
      accessorKey: 'percent',
      header: 'Процент (%)',
      cell: ({ row }) => <div className="centered-cell number-value">{row.original.percent}</div>,
    },
    {
      accessorKey: 'salary',
      header: 'Зарплата',
      cell: ({ row }) => <div className="centered-cell number-value highlight">{row.original.salary.toFixed(2)}</div>,
    }
  ]
  const table = useReactTable({
    data: workers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="table-container">
      <table className="workers-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="table-header">
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
            <tr key={row.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="table-cell">
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