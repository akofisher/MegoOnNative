import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import SetHeader from '../components/SetHeader'
import { API } from '../API/APIs' 
import { useDispatch, useSelector } from 'react-redux'
import { setAddress, setDefAddress } from '../store/Address/AddressActCreat'
import { selectAddress } from '../store/Address/AddressSelector'
import AddressCard from '../components/AddressCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { selectAdrLoad } from '../store/User/userSelector'
import { setAddressLoad } from '../store/User/userActCreat'
import Loader from '../components/Loader'


export default function AddressScreen() {
  const nav = useNavigation()
  const dispatch = useDispatch()
  const ADDRESSDATA = useSelector(selectAddress)
  const ADRLOAD = useSelector(selectAdrLoad)
  const [token, setToken] = useState(null)



  useEffect(() => {
    
    if(ADRLOAD == true) {
      setTimeout(() => {
        dispatch(setAddressLoad(false))
       }, 100);
     }
     
   }, [ADRLOAD])


 
  


  const SetTOKENNN = async () => {
    const TOKEN = await AsyncStorage.getItem('TOKEN')
    .then((value) => setToken(value))
}



useEffect(() => {
  if (token == null || token == undefined) {
      SetTOKENNN()
  } else {
      null
  }

}, [token])

useEffect(() => {
    
}, [ADDRESSDATA])



  useEffect(() => {
    fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ApiMethod: 'AddressList',
              controller: 'Address',            
              pars: {
                TOKEN: token,
              },
            }),
        }).then(db =>{
              db.json().then(json => {            
              if(json.status === 'success' )
              {    

                dispatch(setAddress(json.data))
                {json.data.map((adr) => {
                if(adr.IS_DEFAULT == 1) {
                  dispatch(setDefAddress({DefUID: adr.UID}))
                }
                })}
                

              } 
            })             
          })
  }, [token, ADRLOAD])






  return (
    <SafeAreaView style={styles.Container}>
      <SetHeader/>
      {ADRLOAD == true ? (
        <Loader/>
      ) : (
        <React.Fragment>
        <View style={styles.flexible}>
        <View >
         <Text style={styles.setHeadTXT}>მისამართების წიგნი</Text>
        </View>
      <TouchableOpacity
      onPress={() => nav.navigate('AddAddress')}
      >
      <Image source={require('../Photos/add.png')}
    style={styles.addIcon} 
    />
      </TouchableOpacity>
      </View>
      <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.SecCont}>
        {!! ADDRESSDATA > 0 ? (
          ADDRESSDATA.map((val, idx) => {
            return (
              <AddressCard  key={idx} cart={val}/>
              )
            })
            ) : (null)}
       

      </ScrollView>
            </React.Fragment>
        
      )}
      
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
    setHeadTXT: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#ed8d2d',
      fontFamily: 'Verdana',
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    },
    addIcon: {
      tintColor: '#ed8d2d',
      width: 32,
      height: 32,
    },
    flexible: {
      marginTop: 20,
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
    SecCont: {
      minWidth: '100%',
      marginTop: 40,
      alignItems: 'center',
      paddingBottom: 70,
    }
   
})