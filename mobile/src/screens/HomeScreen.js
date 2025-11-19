import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import api from '../services/api'

export default function HomeScreen({ navigation }) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      load()
    })
    load()
    return unsub
  }, [navigation])

  const load = async () => {
    setLoading(true)
    try {
      const res = await api.list()
      setStudents(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })} style={{ padding: 12, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.nome}</Text>
      <Text>{item.curso} • {item.turma}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Button title="+ Novo Aluno" onPress={() => navigation.navigate('Form', { id: 'novo' })} />
      {loading && <Text>Carregando...</Text>}
      <FlatList
        data={students}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
      />
    </View>
  )
}