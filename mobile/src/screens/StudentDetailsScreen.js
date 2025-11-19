import React, { useEffect, useState } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import api from '../services/api'

export default function StudentDetailsScreen({ route, navigation }) {
  const { id } = route.params
  const [student, setStudent] = useState(null)

  useEffect(() => {
    api.get(id).then(res => setStudent(res.data)).catch(err => console.error(err))
  }, [id])

  const handleDelete = () => {
    Alert.alert('Confirmar', 'Deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        try {
          await api.remove(id)
          navigation.navigate('Home')
        } catch (err) {
          Alert.alert('Erro', 'Não foi possível excluir.')
        }
      }}
    ])
  }

  if (!student) return <View style={{padding: 12}}><Text>Carregando...</Text></View>

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>{student.nome}</Text>
      <Text>ID: {student.id}</Text>
      <Text>Matrícula: {student.matricula}</Text>
      <Text>Curso: {student.curso}</Text>
      <Text>Turma: {student.turma}</Text>

      <View style={{ marginTop: 12 }}>
        <Button title="Editar" onPress={() => navigation.navigate('Form', { id })} />
        <View style={{ height: 8 }} />
        <Button title="Excluir" onPress={handleDelete} color="red" />
        <View style={{ height: 8 }} />
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </View>
  )
}