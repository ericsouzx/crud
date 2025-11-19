import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import StudentDetails from '../pages/StudentDetails'
import api from '../services/api'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

vi.mock('../services/api')

describe('StudentDetails', () => {
  it('shows student and delete navigates', async () => {
    const fake = { id: 1, nome: 'Alice', turma: 'A1', curso: 'Engenharia', matricula: '2023001' }
    api.get.mockResolvedValue({ data: fake })
    api.remove.mockResolvedValue({})

    // route /alunos/1
    render(
      <MemoryRouter initialEntries={['/alunos/1']}>
        <Routes>
          <Route path="/alunos/:id" element={<StudentDetails />} />
          <Route path="/" element={<div>HomePage</div>} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => screen.getByText('Alice'))
    // Simula confirmação do window.confirm
    vi.spyOn(window, 'confirm').mockImplementation(() => true)

    const btnDelete = screen.getByText('Excluir')
    fireEvent.click(btnDelete)

    await waitFor(() => {
      // após remoção, o componente executa navigate('/') — que fará render da HomePage placeholder acima
      expect(screen.getByText('HomePage')).toBeDefined()
    })
  })
})