import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/Home'
import api from '../services/api'
import { BrowserRouter } from 'react-router-dom'

vi.mock('../services/api')

describe('Home page', () => {
  it('renders list of students', async () => {
    const fake = [
      { id: 1, nome: 'Alice', turma: 'A1', curso: 'Engenharia', matricula: '2023001' },
      { id: 2, nome: 'Bob', turma: 'B1', curso: 'Administração', matricula: '2023002' }
    ]
    api.list.mockResolvedValue({ data: fake })

    render(<BrowserRouter><Home /></BrowserRouter>)

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeDefined()
      expect(screen.getByText('Bob')).toBeDefined()
    })
  })

  it('shows empty message when no students', async () => {
    api.list.mockResolvedValue({ data: [] })
    render(<BrowserRouter><Home /></BrowserRouter>)

    await waitFor(() => {
      expect(screen.getByText('Sem alunos cadastrados.')).toBeDefined()
    })
  })
})