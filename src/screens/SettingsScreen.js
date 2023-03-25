import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SetHeader from '../components/SetHeader'

export default function SettingsScreen() {
  const nav = useNavigation()
  return (
    <SafeAreaView style={styles.Container}>
      <SetHeader />
      <Text style={styles.setHeadTXT}>პარამეტრების ცვლილება</Text>
      <View style={styles.SecCont}>
        <TouchableOpacity
          onPress={() => nav.navigate('NumChange')}
          style={styles.smCont}>
          <Image
            source={require('../Photos/phoneEdit.png')}
            style={styles.Icon}
          />
          <Text style={styles.TxtofEdit}>ნომრის შეცვლა</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => nav.navigate('PassChange')}
          style={styles.smCont}>
          <Image
            source={require('../Photos/lock.png')}
            style={styles.Icon}
          />
          <Text style={styles.TxtofEdit}>პაროლის შეცვლა</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => nav.navigate('ProfileDeletion')}
          style={styles.smCont}>
          <Image
            source={require('../Photos/userDel.png')}
            style={styles.Icon}
          />
          <Text style={styles.TxtofEdit}>პროფილის წაშლა</Text>

        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fcd895',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  SecCont: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    flexWrap: 'wrap',
  },
  smCont: {
    width: '47%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  Icon: {
    width: 60,
    height: 40,
    borderRadius: 30,
    resizeMode: 'contain',
    tintColor: '#ed8d2d',
  },
  TxtofEdit: {
    color: '#ed8d2d',
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 15,
    fontFamily: 'Verdana',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  setHeadTXT: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ed8d2d',
    fontFamily: 'Verdana',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  }
})