import React, { useState } from 'react';
import { View, Platform, SafeAreaView, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { API } from '../API/APIs';
import { Formik } from 'formik';
import * as yup from 'yup'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';




const loginValidationSchema = yup.object().shape({
    mobile_confirmation: yup
        .string()
        .required('აუცილებელია მობილური ნომრის შეყვანა'),
})



const UserRecovery = ({ navigation }) => {
    const nav = useNavigation()

    const Recovery = (val) => {
        let contactMobileReplaced = val.replace(/-/g, '')
        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ApiMethod: 'RecoverUserName',
                controller: 'Customers',
                pars: {
                    CONTACT_MOBILE: contactMobileReplaced,
                },
            }),
        }).then(db => {
            db.json().then(json => {

                if (json.status == 'success') {
                    Alert.alert('ყურადღება !', 'მომხმარებლის სახელი გამოგზავნილია მობილურ ნომერზე')
                    nav.navigate('Login')
                } else {
                    Alert.alert('ყურადღება !', 'მობილური ნომერი არ არის რეგისტრირებული')
                }
            })
        })
    }






    return (

        <SafeAreaView style={styles.container}>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                    mobile_confirmation: '',
                }}
                onSubmit={values => {
                    Recovery(values.mobile_confirmation)
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
                                style={styles.ForgImg}
                                source={{
                                    uri: 'https://cdn.mego.ge/img/logo.png',
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <Text style={styles.ForgHead}>მომხმარებლის აღდგენა</Text>

                            <TextInput
                                placeholderTextColor="#A0A0A0"
                                placeholder='მობილურის ნომერი'
                                style={styles.ForgInp}
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
                                onPress={() => props.handleSubmit()}
                                style={styles.ForgBtn}
                            >
                                <Text>აღდგენა</Text>
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
    ForgInp: {
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
    ForgImg: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: 30,
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
        ...Platform.select({
            android: {
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



export default UserRecovery