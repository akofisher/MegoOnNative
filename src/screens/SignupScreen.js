import React, { useState, useEffect } from 'react';
import { View, Platform, SafeAreaView, ScrollView, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { API } from '../API/APIs'
import CheckBox from '@react-native-community/checkbox'
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as yup from 'yup'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';


const loginValidationSchema = yup.object().shape({
  user: yup
    .string()
    .required('აუცილებელია მომხმარებლის შეყვანა'),
  pincode: yup
    .string()
    .required('აუცილებელია პინკოდის შეყვანა'),
  email: yup
    .string()
    .email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა")
    .required('ელ-ფოსტის შეყვანა აუცილებელია'),
  name: yup
    .string()
    .matches(/(\w.+\s).+/, 'შეიყვანეთ სრული სახლი და გვარი')
    .required('შევსება აუცილებელია'),
  mobile_confirmation: yup
    .string()
    .required('შევსება აუცილებელია'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "პაროლი უნდა შეიცავდეს მინ. ერთ პატარა სიმბოლოს")
    .matches(/\w*[A-Z]\w*/, "პაროლი უნდა შეიცავდეს მინ. ერთ დიდ სიმბოლოს")
    .matches(/\d/, "პაროლი უნდა შეიცავდეს მინ. ერთ ციფრს")
    .min(8, ({ min }) => `პაროლი უნდა შეიცავდეს მინ. ${min} სიმბოლოს`)
    .required('შევსება აუცილებელია'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], 'პაროლები არ ემთხვევა')
    .required('შევსება აუცილებელია'),
})



const SignupScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false)
  const nav = useNavigation()

  useEffect(() => {
  }, [checked])

  const AfterReg = (val1, val2) => {
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ApiMethod: 'Login',
        controller: 'Customers',
        pars: {
          USER_NAME: val1,
          USER_PASS: val2,
        },
      }),
    }).then(db => {
      db.json().then(async json => {
        if (json.status == 'success') {

          await AsyncStorage.setItem('User', json.data.USER_NAME)
          await AsyncStorage.setItem('UserName', json.data.FIRST_NAME)
          await AsyncStorage.setItem('TOKEN', json.data.FRONT_TOKEN)
          await AsyncStorage.setItem('EMAIL', json.data.USER_EMAIL)
          await AsyncStorage.setItem('MOB', json.data.USER_CONTACT_MOBILE)
          await navigation.navigate('Main')
        } else {
          Alert.alert('ყურადღება', 'გთხოვთ ყველა ველი შეავსოთ ყურადღებით !')
        }
      })
    })
  }


  const GetPin = (mob) => {
    let contactMobileReplaced = mob.replace(/-/g, '')
    if (contactMobileReplaced.length == 9) {
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
      }).then(db => {
        db.json().then(json => {
          if (json.status == 'success') {

          }
        })
      })
    } else {
      Alert.alert('ყურადღება', 'მობილური ნომერი არასწორია')
    }
  }


  return (
    <SafeAreaView style={styles.container1}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            email: '',
            name: '',
            user: '',
            password: '',
            password2: '',
            mobile_confirmation: '',
            pincode: '',
            lastName: '',


          }}
          onSubmit={values => {
            if (checked == true) {
              if (values.password == values.password2) {
                fetch(API, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ApiMethod: 'Registration',
                    controller: 'Customers',
                    pars: {
                      EMAIL: values.email,
                      FIRST_NAME: values.name,
                      LAST_NAME: '',
                      USER_NAME: values.user,
                      USER_PASS: values.password,
                      CONTACT_MOBILE: values.mobile_confirmation,
                      PINCODE: values.pincode,
                    }
                  }),
                }).then(db => {
                  db.json().then(json => {

                    if (json.status == 'success') {
                      AfterReg(values.user, values.password)
                    } else if (json.status == 'fail' && json.comment == "User With Same Creditials Exists") {
                      Alert.alert('ყურადღება', 'მსგავსი მომხმარებელი ან მობილური ნომერი უკვე არსებობს')
                    } else if (json.status == 'fail' && json.comment == "Invalid pincode") {
                      Alert.alert('ყურადღება', 'პინკოდი არასწორია')
                    } else {
                      Alert.alert('ყურადღება', `${json.comment}`)
                    }
                  })
                })
              } else {
                Alert.alert('ყურადღება', 'პაროლები არ ემთხვევა')
              }
            } else {
              Alert.alert('ყურადღება', 'გთხოვთ დაეთანხმოთ წესებს')
            }
          }}
        >
          {(props) => {
            return (
              <React.Fragment>

                <TouchableOpacity
                  onPress={() => nav.goBack()}
                  style={styles.GoBack}>
                  <Image source={require('../Photos/goback.png')}
                    style={styles.GobackIcon}
                  />
                  <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>

                </TouchableOpacity>
                <FastImage
                  style={styles.SignUpImg}
                  source={{
                    uri: 'https://cdn.mego.ge/img/logo.png',
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.SignUpHead}>მომხმარებლის რეგისტრაცია</Text>
                <TextInput
                  placeholderTextColor="#A0A0A0"
                  placeholder='შეიყვანეთ სახელი, გვარი'
                  style={styles.SignUpInp}
                  defaultValue={''}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                ></TextInput>
                {props.errors.name &&
                  <Text style={styles.SignErr}>{props.errors.name}</Text>
                }
                <TextInput
                  placeholderTextColor="#A0A0A0"
                  placeholder='შეიყვანეთ მომხმარებლის სახელი'
                  style={styles.SignUpInp}
                  defaultValue={''}
                  onChangeText={props.handleChange('user')}
                  onBlur={props.handleBlur('user')}
                  value={props.values.user}
                ></TextInput>
                {props.errors.user &&
                  <Text style={styles.SignErr}>{props.errors.user}</Text>
                }
                <TextInput
                  placeholderTextColor="#A0A0A0"
                  placeholder='შეიყვანეთ ელ-ფოსტა'
                  style={styles.SignUpInp}
                  defaultValue={''}
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                ></TextInput>
                {props.errors.email &&
                  <Text style={styles.SignErr}>{props.errors.email}</Text>
                }
                <TextInput
                  placeholderTextColor="#A0A0A0"
                  placeholder='შეიყვანეთ პაროლი'
                  style={styles.SignUpInp}
                  defaultValue={''}
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                  secureTextEntry={true}
                ></TextInput>
                {props.errors.password &&
                  <Text style={styles.SignErr}>{props.errors.password}</Text>
                }
                <TextInput
                  placeholderTextColor="#A0A0A0"
                  placeholder='გაიმეორეთ პაროლი'
                  style={styles.SignUpInp}
                  defaultValue={''}
                  onChangeText={props.handleChange('password2')}
                  onBlur={props.handleBlur('password2')}
                  value={props.values.password2}
                  secureTextEntry={true}
                ></TextInput>
                {props.errors.password2 &&
                  <Text style={styles.SignErr}>{props.errors.password2}</Text>
                }
                <TextInput
                  placeholderTextColor="#A0A0A0"
                  placeholder='შეიყვანეთ მობილური ნომერი'
                  style={styles.SignUpInp}
                  defaultValue={''}
                  onChangeText={props.handleChange('mobile_confirmation')}
                  onBlur={props.handleBlur('mobile_confirmation')}
                  value={props.values.mobile_confirmation}
                  keyboardType="numeric"
                ></TextInput>
                {props.errors.mobile_confirmation &&
                  <Text style={styles.SignErr}>{props.errors.mobile_confirmation}</Text>
                }
                <TouchableOpacity
                  onPress={() => GetPin(props.values.mobile_confirmation)}
                  style={styles.SignUpBtnPin}
                >
                  <Text style={styles.btnTxts}>PIN-ის მიღება</Text>
                </TouchableOpacity>
                <TextInput
                  placeholderTextColor="#A0A0A0"
                  placeholder='შეიყვანეთ პინკოდი'
                  style={styles.SignUpInp}
                  defaultValue={''}
                  onChangeText={props.handleChange('pincode')}
                  onBlur={props.handleBlur('pincode')}
                  value={props.values.pincode}
                ></TextInput>
                {props.errors.pincode &&
                  <Text style={styles.SignErr}>{props.errors.pincode}</Text>
                }
                <TouchableOpacity
                  onPress={() => {
                    if (checked == false) {
                      setChecked(true)
                    } else {
                      setChecked(false)
                    }
                  }
                  }
                  style={styles.checkCont}>
                  <CheckBox
                    disabled={false}
                    value={checked}
                    style={styles.SignupCheck}
                  />
                  <Text style={styles.UniverText}>ვეთანხმები წესებს</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.handleSubmit()}
                  style={styles.SignUpBtn}
                >
                  <Text style={styles.btnTxts}>რეგისტრაცია</Text>
                </TouchableOpacity>
              </React.Fragment>
            )

          }}

        </Formik>
      </ScrollView>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcd895',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  container1: {
    width: '100%',
    backgroundColor: '#fcd895',
  },
  SignUpInp: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    height: 50,
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 5,
    fontFamily: 'Verdana',
    color: 'black',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  SignUpImg: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 0,
  },
  SignUpBtn: {
    backgroundColor: '#ed8d2d',
    borderRadius: 5,
    padding: 10,
    width: 130,
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 30,
  },
  SignUpHead: {
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
  SignUpBtnPin: {
    backgroundColor: '#ed8d2d',
    borderRadius: 5,
    padding: 10,
    width: 130,
    alignItems: 'center',
    marginTop: 30,

  },
  checkCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  SignupCheck: {
    marginRight: 40,
    width: 6,
  },
  ForgBtn1: {
    color: '#ed8d2d',
    textDecorationLine: 'underline',
    fontSize: 17,
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10,
    marginTop: 40,
    ...Platform.select({
      android: {
        marginTop: 10,
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
  btnTxts: {
    fontSize: 12,
    fontFamily: 'Verdana',
    color: 'black',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  UniverText: {
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



export default SignupScreen