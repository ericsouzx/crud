import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { Container } from 'react-bootstrap'

export default function StudentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get(id)
      .then(res => setStudent(res.data))
      .catch(err => setError(err.message || 'Erro ao buscar aluno'))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Confirma exclusão do aluno?')) return
    try {
      await api.remove(id)
      // volta para tela inicial após exclusão
      navigate('/')
    } catch (err) {
      alert('Erro ao excluir: ' + (err.message || ''))
    }
  }

  if (loading) return <Container><p>Carregando...</p></Container>
  if (error) return <Container><div className="alert alert-danger">{error}</div></Container>
  if (!student) return <Container><p>Aluno não encontrado.</p></Container>

  return (
    <Container>
      <h2>{student.nome}</h2>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Matrícula:</strong> {student.matricula}</p>
      <p><strong>Curso:</strong> {student.curso}</p>
      <p><strong>Turma:</strong> {student.turma}</p>

      <div className="d-flex gap-2">
        <Link className="btn btn-primary" to={`/alunos/${student.id}/editar`}>Editar</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Excluir</button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Voltar</button>
      </div>
    </Container>
  )
}