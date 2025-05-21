import { View, Text } from 'react-native'
import { Tabs } from "expo-router";

export default function Tablayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
        <Tabs.Screen 
          name="index"
          options={{
            title: "Accueil"
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Créer"
          }}
        />
        <Tabs.Screen 
          name="profile"
          options={{
            title: "Profil"
          }}
        />
    </Tabs>
  )
}