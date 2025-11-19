import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import api from '../services/api'

export default function StudentFormScreen({ route, navigation }) {
  const { id } = route.params || {}
  const isEdit = id && id !== 'novo'

  const [form, setForm] = useState({ nome: '', curso: '', turma: '', matricula: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      api.get(id).then(res => {
        const s = res.data
        setForm({ nome: s.nome || '', curso: s.curso || '', turma: s.turma || '', matricula: s.matricula || '' })
      }).catch(err => console.error(err))
    }
  }, [id])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (isEdit) await api.update(id, form)
      else await api.create(form)
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ padding: 12 }}>
      <Text>Nome</Text>
      <TextInput value={form.nome} onChangeText={(t) => setForm(s => ({...s, nome: t}))} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>Curso</Text>
      <TextInput value={form.curso} onChangeText={(t) => setForm(s => ({...s, curso: t}))} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>Turma</Text>
      <TextInput value={form.turma} onChangeText={(t) => setForm(s => ({...s, turma: t}))} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Text>Matrícula</Text>
      <TextInput value={form.matricula} onChangeText={(t) => setForm(s => ({...s, matricula: t}))} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />

      <Button title={loading ? 'Salvando...' : 'Salvar'} onPress={handleSubmit} />
      <View style={{ height: 8 }} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
    </View>
  )
}