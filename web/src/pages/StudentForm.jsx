import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import { Container } from 'react-bootstrap'

export default function StudentForm() {
  const { id } = useParams() // id === 'novo' or actual id
  const navigate = useNavigate()
  const isEdit = id && id !== 'novo'

  const [form, setForm] = useState({
    nome: '',
    turma: '',
    curso: '',
    matricula: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEdit) {
      setLoading(true)
      api.get(id).then(res => {
        const s = res.data
        setForm({ nome: s.nome || '', turma: s.turma || '', curso: s.curso || '', matricula: s.matricula || '' })
      }).catch(err => setError(err.message || 'Erro'))
      .finally(() => setLoading(false))
    }
  }, [id])

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isEdit) {
        await api.update(id, form)
      } else {
        await api.create(form)
      }
      navigate('/') // volta para tela inicial após salvar
    } catch (err) {
      setError(err.message || 'Erro ao salvar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <h2>{isEdit ? 'Editar Aluno' : 'Novo Aluno'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input name="nome" value={form.nome} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Curso</label>
          <input name="curso" value={form.curso} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Turma</label>
          <input name="turma" value={form.turma} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Matrícula</label>
          <input name="matricula" value={form.matricula} onChange={handleChange} className="form-control" required />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </Container>
  )
}