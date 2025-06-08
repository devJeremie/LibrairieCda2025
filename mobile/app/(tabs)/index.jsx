import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../store/authStore'

export default function Home() {

  const { logout } = useAuthStore();

  return (
    <View>
      <Text>Onglet accueil</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Deconnexion</Text>
      </TouchableOpacity>
    </View>
  )
}