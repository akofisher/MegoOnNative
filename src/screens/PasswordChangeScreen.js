import { View, Platform, SafeAreaView, Text, StyleSheet, Image, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { API } from '../API/APIs'
import { Formik } from 'formik'
import * as yup from 'yup'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader'





const loginValidationSchema = yup.object().shape({
  oldPass: yup
  .string()
  .required('აუცილებელია პაროლის შეყვანა'),
  newPass: yup
  .string()
  .required('აუცილებელია პაროლის შეყვანა'),
  repeatPass: yup
  .string()
  .required('აუცილებელია პაროლის შეყვანა'),
})




export default function PasswordChangeScreen() {
  const nav = useNavigation()
  const [token, setToken] = useState(null)
  const [load, setLoad] = useState(false)


  
  
  useEffect(() => {
    const TOKEN =  AsyncStorage.getItem('TOKEN')
    .then((value) => setToken(value))
  
  }, [token])
  

  const ChangePass =  (val1, val2, val3) => {
     if(val2 == val3) {
      setLoad(true)
       fetch(API, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
          },
            body: JSON.stringify({
                  ApiMethod: 'ChangeUserPassword',
                  controller: 'Customers',
                  pars: {
                    OLD_PDW: val1,
                    NEW_PDW: val2,
                    TOKEN: token,
                  },
                }),
              }).then(db =>{
                db.json().then(json => {            
                  if(json.status == 'success' )
                  {    
                    Alert.alert('ყურადღება','პაროლი წარმატებით შეიცვალა !')   
                    setLoad(false)        
                  } else {
                    setLoad(false)
                    Alert.alert('ყურადღება','სამწუხაროდ პაროლის შეცვლა ვერ მოხერხდა')
                  }
                })             
              })
            } else {
              Alert.alert('ყურადღება','განმეორებული პაროლი არ ემთხვევა')
            }
        
  }









  return (
    <SafeAreaView style={styles.Container}>
      
      {load ? (
        <Loader/>
      ) : (
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ 
                oldPass: '' ,
                newPass: '' ,
                repeatPass: '' ,

        }}
            onSubmit={values =>  ChangePass(values.oldPass, values.newPass, values.repeatPass)
             
            }>
                {(props) => {
                    return (
                <React.Fragment>
                <TouchableOpacity
            onPress={() =>  nav.goBack()}
            style={styles.GoBack}>
            <Image source={require('../Photos/goback.png')}
      style={styles.GobackIcon} 
      />
      <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>
                
            </TouchableOpacity>
                
         
            <FastImage
            style={styles.ForgImg}
            source={{
                uri: 'https://cdn.mego.ge/img/logo.png',
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.ForgHead}>პაროლის შეცვლა</Text>
            <TextInput 
            placeholderTextColor="#A0A0A0"
            placeholder='შეიყვანეთ ძველი პაროლი'
            style={styles.ForgInp}
            defaultValue={''}
            secureTextEntry={true}
                    onChangeText={props.handleChange('oldPass')}
                    onBlur={props.handleBlur('oldPass')}
                    value={props.values.oldPass}
            ></TextInput>
            {props.errors.oldPass &&
         <Text style={styles.SignErr}>{props.errors.oldPass}</Text>
       }
        <TextInput 
        placeholderTextColor="#A0A0A0"
            placeholder='შეიყვანეთ ახალი პაროლი'
            style={styles.ForgInp}
            defaultValue={''}
            secureTextEntry={true}
                    onChangeText={props.handleChange('newPass')}
                    onBlur={props.handleBlur('newPass')}
                    value={props.values.newPass}
            ></TextInput>
            {props.errors.newPass &&
         <Text style={styles.SignErr}>{props.errors.newPass}</Text>
       }
            <TextInput 
            placeholderTextColor="#A0A0A0"
            placeholder='გაიმეორეთ პაროლი'
            style={styles.ForgInp}
            defaultValue={''}
            secureTextEntry={true}
            onChangeText={props.handleChange('repeatPass')}
            onBlur={props.handleBlur('repeatPass')}
            value={props.values.repeatPass}
            ></TextInput>
            {props.errors.repeatPass &&
         <Text style={styles.SignErr}>{props.errors.repeatPass}</Text>
       }
            <TouchableOpacity
            onPress={() => props.handleSubmit()}
            style={styles.ForgBtn}  
            >
                <Text style={styles.UnivText}>შეცვლა</Text>
            </TouchableOpacity>
            
            </React.Fragment>
            )}}
            </Formik>
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
  ForgInp: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5 ,
    width: '60%',
    height: 50,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 5,
    fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
},
ForgImg: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
},
ForgBtn: {
    backgroundColor: '#ed8d2d',
    borderRadius: 5,
    padding: 12,
    width: 140,
    alignItems: 'center',
    marginTop: 30,
}, 
ForgBtn1: {
    color: '#ed8d2d',
    textDecorationLine: 'underline',
    fontSize: 17,
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10,
    fontFamily: 'Verdana', 
  ...Platform.select({
    android: {
          fontFamily: 'Roboto', 
            marginTop: 5,
        }
    })
}, 
ForgHead: {
    color: '#ed8d2d', 
    paddingBottom: 40, 
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Verdana',
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
},
SignErr: { 
    fontSize: 10, 
    color: 'red',
    fontFamily: 'Verdana',
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
},
UnivText: {
  fontSize: 15,
  fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
},
GoBack: {
  flexDirection: 'row',
  alignSelf: 'flex-start',
  paddingLeft: 20,
  paddingTop: 20,
  alignItems: 'center',
},
GobackIcon: {
    marginRight: 10,
    tintColor: '#ed8d2d', 
    
},
CartGoBack: {
  fontSize: 15,
  color: '#ed8d2d', 
  fontWeight: 'bold',
  fontFamily: 'Verdana',
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
},
})