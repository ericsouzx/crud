import React, { useEffect, useState } from 'react'
import api from '../services/api'
import StudentCard from '../components/StudentCard'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default function Home() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.list()
      .then(res => {
        // assumimos res.data ser uma lista de alunos
        setStudents(res.data)
      })
      .catch(err => {
        setError(err.message || 'Erro ao buscar alunos')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Lista de Alunos</h1>
        <Link className="btn btn-success" to="/alunos/novo">+ Novo Aluno</Link>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="container-card">
        {students && students.length === 0 && !loading && <p>Sem alunos cadastrados.</p>}
        {students && students.map(s => <StudentCard key={s.id} student={s} />)}
      </div>
    </Container>
  )
}