import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function StudentCard({ student }) {
  return (
    <Card className="mb-3 student-card">
      <Card.Body>
        <Card.Title>{student.nome}</Card.Title>
        <Card.Text>
          <strong>Curso:</strong> {student.curso} <br/>
          <strong>Turma:</strong> {student.turma} <br/>
          <strong>Matrícula:</strong> {student.matricula}
        </Card.Text>
        <Link to={`/alunos/${student.id}`} className="btn btn-primary me-2">Ver detalhes</Link>
      </Card.Body>
    </Card>
  )
}