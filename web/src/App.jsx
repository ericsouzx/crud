import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import StudentDetails from './pages/StudentDetails'
import StudentForm from './pages/StudentForm'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/alunos/novo" element={<StudentForm />} />
      <Route path="/alunos/:id" element={<StudentDetails />} />
      <Route path="/alunos/:id/editar" element={<StudentForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
