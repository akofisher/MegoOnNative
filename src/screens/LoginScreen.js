import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Image, TouchableOpacity, PermissionsAndroid, SafeAreaView } from 'react-native'
import { API } from '../API/APIs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { selectLogedin } from '../store/User/userSelector';
import { setLogedin } from '../store/User/userActCreat';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';


const loginValidationSchema = yup.object().shape({
    user: yup
        .string()
        .required('აუცილებელია მომხმარებლის შეყვანა'),
    password: yup
        .string()
        .required('აუცილებელია პაროლის შეყვანა'),
})


const AllowLocatPerm = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                "title": "ReactNativeCode Location Permission",
                "message": "ReactNativeCode App needs access to your location"
            }
        )
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('ყურადღება', 'გთხოვთ დაეთანხმოთ ლოკაციაზე წვდომის მიღებას')
        }
    }
    catch (err) {
        console.log(err, 'ERROR ON LOCATION GRATING')
    }
}


const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const USER = useSelector(selectLogedin)
    const nav = useNavigation()

    const onLogin = (val1, val2) => {
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
                    await AllowLocatPerm()
                    await AsyncStorage.setItem('User', json.data.USER_NAME)
                    await AsyncStorage.setItem('UserName', json.data.FIRST_NAME)
                    await AsyncStorage.setItem('TOKEN', json.data.FRONT_TOKEN)
                    await AsyncStorage.setItem('EMAIL', json.data.USER_EMAIL)
                    await AsyncStorage.setItem('MOB', json.data.USER_CONTACT_MOBILE)
                    dispatch(setLogedin({ isLogedin: true, }))
                    await AsyncStorage.removeItem('UserCart')
                    await AsyncStorage.removeItem('TOTALS')
                    await navigation.navigate('Home')

                } else {

                    Alert.alert('ყურადღება', 'მომხმარებელი ან პაროლი არასწორია')

                }
            })
        })
    }


    return (
        <SafeAreaView style={styles.container}>

            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                    user: '',
                    password: '',

                }}
                onSubmit={values => {
                    onLogin(values.user, values.password)
                }}>
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
                                style={styles.LogImg}
                                source={{
                                    uri: 'https://cdn.mego.ge/img/logo.png',
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />

                            <Text style={styles.LogHead}>სისტემაში შესვლა</Text>
                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                placeholder='მომხმარებლის სახელი'
                                style={styles.LogInp}
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
                                placeholder='პაროლი'
                                style={styles.LogInp}
                                defaultValue={''}
                                onChangeText={props.handleChange('password')}
                                onBlur={props.handleBlur('password')}
                                value={props.values.password}
                                secureTextEntry={true}
                            ></TextInput>
                            {props.errors.password &&
                                <Text style={styles.SignErr}>{props.errors.password}</Text>
                            }
                            <TouchableOpacity
                                onPress={() => props.handleSubmit()}
                                style={styles.LogBtn}
                            >
                                <Text style={styles.btnTxts}>შესვლა</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Forgot')}
                            >
                                <Text
                                    style={styles.LogPassRec}

                                >დაგავიწყდა პაროლი ?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('UserRecovery')}
                            >
                                <Text
                                    style={styles.LogUserRec}

                                >მომხმარებლის აღდგენა</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Signup')}
                                style={styles.LogSignUp}
                            >
                                <Text style={styles.btnTxts}>რეგისტრაცია</Text>

                            </TouchableOpacity>
                        </React.Fragment>
                    )
                }}
            </Formik>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcd895',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    LogInp: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
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
    LogImg: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
        marginTop: 30,
    },
    LogBtn: {
        backgroundColor: '#ed8d2d',
        borderRadius: 5,
        padding: 10,
        width: 130,
        alignItems: 'center',
        marginTop: 30,
    },
    LogPassRec: {
        padding: 5,
        color: 'black',
        textDecorationLine: 'underline',
        marginBottom: 15,
        marginTop: 15,
        fontFamily: 'Verdana',
        ...Platform.select({
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    LogUserRec: {
        padding: 5,
        color: 'black',
        textDecorationLine: 'underline',
        marginBottom: 15,
        fontFamily: 'Verdana',
        ...Platform.select({
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    LogSignUp: {
        backgroundColor: '#ed8d2d',
        borderRadius: 5,
        padding: 10,
        width: 130,
        alignItems: 'center',
    },
    LogHead: {
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



export default LoginScreen