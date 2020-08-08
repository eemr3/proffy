import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import {
  ScrollView,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler'
import { Picker } from '@react-native-community/picker'
import { useFocusEffect } from '@react-navigation/native'
import AsynStorage from '@react-native-community/async-storage'
import { Feather } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'

import styles from './styles'

function TeacherList() {
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState<number>(0)
  const [time, setTime] = useState('')

  function loadFavorites() {
    AsynStorage.getItem('favorites').then((resp) => {
      if (resp) {
        const favoritedTeachers = JSON.parse(resp)
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id
          }
        )
        setFavorites(favoritedTeachersIds)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })
  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit() {
    loadFavorites()
    const response = await api.get('classes', {
      params: {
        subject: subject.trim(),
        week_day,
        time,
      },
    })

    setTeachers(response.data)
    setIsFiltersVisible(false)
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <View style={styles.select}>
              <Picker
                selectedValue={subject}
                onValueChange={(itemValue) => setSubject(String(itemValue))}
              >
                <Picker.Item
                  color="#c1bccc"
                  value=""
                  label="Selecione a matéria"
                />
                <Picker.Item value="Portugues" label="Portugues" />
                <Picker.Item value="Matemática" label="Matemática" />
                <Picker.Item value="Geografia" label="Geografia" />
                <Picker.Item value="Históira" label="Históira" />
                <Picker.Item value="Física" label="Física" />
                <Picker.Item value="Quimica" label="Química" />
                <Picker.Item value="Biologia" label="Biologia" />
                <Picker.Item value="Educacao Fisica" label="Educação Física" />
                <Picker.Item value="Ingles" label="Ingles" />
                <Picker.Item value="Arte" label="Arte" />
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <View style={styles.select}>
                  <Picker
                    selectedValue={week_day}
                    onValueChange={(itemValue) =>
                      setWeek_day(Number(itemValue))
                    }
                  >
                    <Picker.Item
                      color="#c1bccc"
                      value=""
                      label="Selecione o dia"
                    />
                    <Picker.Item value={0} label="Domingo" />
                    <Picker.Item value={1} label="Segunda-feira" />
                    <Picker.Item value={2} label="Terça-feira" />
                    <Picker.Item value={3} label="Quarta-feira" />
                    <Picker.Item value={4} label="Quinta-feira" />
                    <Picker.Item value={5} label="Sexta-feira" />
                    <Picker.Item value={6} label="Sábado" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder={'Qual o horário'}
                  placeholderTextColor="#C1BCCC"
                />
              </View>
            </View>
            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 34 }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default TeacherList
