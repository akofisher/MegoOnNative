import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectLogedin } from '../store/User/userSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FastImage from 'react-native-fast-image'

export default function SetHeader() {
  const LOGEDIN = useSelector(selectLogedin)
  const [user, setUser] = useState('')
  const nav = useNavigation()



  useEffect(() => {
    const USER_NAME =  AsyncStorage.getItem('User')
    .then((value) => setUser(value))
    
  }, [LOGEDIN])





  return (
    <View style={styles.SettingsHead}>
    <TouchableOpacity
    style={styles.HeadBurgIcon1}
    onPress={async () =>  nav.openDrawer()
    
    }
    > 
    <Image source={require('../Photos/menuIcon.png')}
    style={styles.HeadBurgIcon} 
    />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.HeadBtn}
      onPress={() => nav.navigate('Home')}
      >
    <FastImage
            style={styles.LogImg}
            source={{
                uri: 'https://cdn.mego.ge/img/logo.png',
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            />
            </TouchableOpacity>
    <Image
        source={require('../Photos/userr.png')}
        style={{ width: 60, height: 40, borderRadius: 30 , resizeMode: 'contain',}}
      />

    </View>
  )
}



const styles = StyleSheet.create({
    
    SettingsHead: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ed8d2d',
      paddingBottom: 15,
      ...Platform.select({
        android: {
          paddingTop: 10,
        }
      })
    },
    HeadBurgIcon: {
      width: '100%', 
      height: '100%', 
      resizeMode: 'contain',
      tintColor: '#ed8d2d',
    },
    HeadBurgIcon1: {
      width: '13%',
      height: 40,
      paddingLeft: 5,
      position: 'relative',
    },
    LogImg: {
      width: '100%', 
      height: 50,
      resizeMode: 'stretch',
      
      
  },
  HeadBtn: {
     width: 110,
     height: 50,
  },
   
})