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
  mobile_confirmation: yup
  .string()
  .required('აუცილებელია ნომრის შეყვანა'),
  pincode: yup
  .string()
  .required('აუცილებელია პინკოდის შეყვანა'),

})





export default function PhoneNumChangeScreen() {
  const nav = useNavigation()
  const [user, setUser] = useState('')
  const [load, setLoad] = useState(false)
  const [token, setToken] = useState(null)



  
  
  useEffect(() => {
    const USER =  AsyncStorage.getItem('UserName')
    .then((value) => setUser(value))
  
  }, [user])


   
  useEffect(() => {
    const TOKEN =  AsyncStorage.getItem('TOKEN')
    .then((value) => setToken(value))
  
  }, [token])
  

  const ChangeNumber =  (val1, val2) => {
     if(val1.length == 9 && val2 ) {
      setLoad(true)
      fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'UpdateProfile',
            controller: 'Customers',
            pars: {
                CONTACT_MOBILE: val1,
                PINCODE: val2,
                TOKEN: token,
            },
              
        }),
    })
    .then(db =>{
                db.json().then(json => {            
                  if(json.status == 'success' )
                  {    
                    Alert.alert('ყურადღება','ნომერი წარმატებით შეიცვალა !')   
                    setLoad(false)        
                  } else {
                    setLoad(false)
                    Alert.alert('ყურადღება','სამწუხაროდ ნომრის ცვლილება ვერ მოხერხდა')
                  }
                })             
              })
            } else {
              Alert.alert('ყურადღება','ნომერი ან პინკოდი არასწორია')
            }
        
  }

  const GetPin = (val) => {
    if(val.length == 9) {
    let contactMobileReplaced = val.replace(/-/g, '')
   fetch(API, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                   ApiMethod: 'GetPinCode',
                   controller: 'Customers',
                   pars: {
                       MOBILE: contactMobileReplaced,
                   },
              }),
          }).then(db =>{
                 db.json().then(json => {            
                if(json.status == 'success' )
                {              
                 
                    
                } 
              })             
            })
          } else { 
            Alert.alert('ყურადღება','მონაცემი არასწორია') 
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
                mobile_confirmation: '' ,
                pincode: '' ,

        }}
            onSubmit={values =>  ChangeNumber(values.mobile_confirmation, values.pincode)
             
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
            <Text style={styles.ForgHead}>მობილური ნომრის შეცვლა</Text>
            <TextInput 
            placeholderTextColor="#A0A0A0"
            placeholder='თქვენი სახელი და გვარი'
            style={styles.ForgInp}
            defaultValue={user}
            editable={false} 
            selectTextOnFocus={false}
                    onChangeText={props.handleChange('oldPass')}
                    onBlur={props.handleBlur('oldPass')}
                    value={props.values.oldPass}
            ></TextInput>
            {props.errors.oldPass &&
         <Text style={styles.SignErr}>{props.errors.oldPass}</Text>
       }
        <TextInput 
        placeholderTextColor="#A0A0A0"
            placeholder='შეიყვანეთ მობ.ნომერი'
            style={styles.ForgInp}
            defaultValue={''}
                    onChangeText={props.handleChange('mobile_confirmation')}
                    onBlur={props.handleBlur('mobile_confirmation')}
                    keyboardType="numeric"
                    value={props.values.mobile_confirmation}
            ></TextInput>
            {props.errors.mobile_confirmation &&
         <Text style={styles.SignErr}>{props.errors.mobile_confirmation}</Text>
       }    
       <TouchableOpacity
       onPress={() => GetPin(props.values.mobile_confirmation)}
       style={styles.pinButton}
       >
         <Text style={styles.pinTxt}>PIN-ის მიღება</Text>
       </TouchableOpacity>
            <TextInput 
            placeholderTextColor="#A0A0A0"
            placeholder='შეიყვანეთ პინკოდი'
            style={styles.ForgInp}
            defaultValue={''}
            onChangeText={props.handleChange('pincode')}
            onBlur={props.handleBlur('pincode')}
            keyboardType="numeric"
            value={props.values.pincode}
            ></TextInput>
            {props.errors.pincode &&
         <Text style={styles.SignErr}>{props.errors.pincode}</Text>
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
pinButton: {
  backgroundColor: '#ed8d2d', 
  padding: 10,
  borderRadius: 10,
  marginTop: 20,
  
},
pinTxt: {
  fontSize: 15,
  fontFamily: 'Verdana',
color: 'black', 
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