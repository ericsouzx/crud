import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import StudentDetailsScreen from './screens/StudentDetailsScreen'
import StudentFormScreen from './screens/StudentFormScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Lista de Alunos' }} />
        <Stack.Screen name="Details" component={StudentDetailsScreen} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="Form" component={StudentFormScreen} options={{ title: 'Novo / Editar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}