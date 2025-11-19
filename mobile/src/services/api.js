import axios from 'axios'

const api = axios.create({
  baseURL: 'https://proweb.leoproti.com.br/alunos',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

export default {
  list: () => api.get('/'),
  get: (id) => api.get(`/${id}`),
  create: (data) => api.post('/', data),
  update: (id, data) => api.put(`/${id}`, data),
  remove: (id) => api.delete(`/${id}`)
}