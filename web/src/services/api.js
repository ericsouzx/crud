import axios from 'axios'

const api = axios.create({
  baseURL: 'https://proweb.leoproti.com.br', // domínio raiz
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
})

export default {
  list: () => api.get('/alunos'),           // GET https://proweb.leoproti.com.br/alunos
  get: (id) => api.get(`/alunos/${id}`),
  create: (data) => api.post('/alunos', data),
  update: (id, data) => api.put(`/alunos/${id}`, data),
  remove: (id) => api.delete(`/alunos/${id}`)
}