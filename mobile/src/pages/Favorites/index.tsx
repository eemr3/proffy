import React, { useState } from 'react'
import { View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'
import AsynStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'
function Favorites() {
  const [favorites, setFavorites] = useState([])

  function loadFavorites() {
    AsynStorage.getItem('favorites').then((resp) => {
      if (resp) {
        const favoritedTeachers = JSON.parse(resp)

        setFavorites(favoritedTeachers)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 34 }}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited />
        })}
      </ScrollView>
    </View>
  )
}

export default Favorites
