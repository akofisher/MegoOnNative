import {
    View, Platform, SafeAreaView,
    Text, StyleSheet, Image,
    Alert, Modal, TextInput, Pressable, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { API } from '../API/APIs'
import { Formik } from 'formik'
import * as yup from 'yup'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { setLogedin } from '../store/User/userActCreat'










export default function ProfileDeletion() {
    const nav = useNavigation()
    const dispatch = useDispatch()
    const [pincode, setPincode] = useState(null)
    const [token, setToken] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [email, setEmail] = useState(null)
    const [userName, setUserName] = useState(null)
    const [user, setUser] = useState(null)
    const [load, setLoad] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)




    useEffect(() => {
        const TOKEN = AsyncStorage.getItem('TOKEN')
            .then((value) => setToken(value))
        const UserName = AsyncStorage.getItem('UserName')
            .then((value) => setUserName(value))
        const EMAIL = AsyncStorage.getItem('EMAIL')
            .then((value) => setEmail(value))
        const MOB = AsyncStorage.getItem('MOB')
            .then((value) => setMobile(value))
        const User = AsyncStorage.getItem('User')
            .then((value) => setUser(value))


    }, [token, user, userName, mobile, email])


    const UserDeactivation = (val) => {
        if (mobile !== null && token !== null) {
            let contactMobileReplaced = mobile.replace(/-/g, '')
            fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ApiMethod: 'DeactivateUser',
                    controller: 'Customers',
                    pars: {
                        USER_TOKEN: token,
                        CONTACT_MOBILE: contactMobileReplaced,
                        PINCODE: val,

                    },
                }),
            }).then(db => {
                db.json().then(async json => {
                    if (json.status == 'success') {
                        await setModalVisible(!modalVisible)
                        await alert('თქვენი პროფილი წარმატებით წაიშალა !')
                        await nav.navigate('Home')
                        await AsyncStorage.removeItem('UserCart')
                        await AsyncStorage.removeItem('TOTALS')
                        await AsyncStorage.removeItem('TOKEN')
                        await AsyncStorage.removeItem('UserName')
                        await AsyncStorage.removeItem('EMAIL')
                        await AsyncStorage.removeItem('MOB')
                        await AsyncStorage.removeItem('User')
                        await dispatch(setLogedin({ isLogedin: false }))
                    } else {
                        await setModalVisible(!modalVisible)
                        await setPincode(null)
                        await alert('დაფიქსირდა შეცდომა, გთხოვთ სცადოთ ხელახლა')
                    }

                })
            })
        }


    }


    const GetPin = () => {
        let contactMobileReplaced = mobile.replace(/-/g, '')
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
                    setModalVisible(true)
                } else {
                    alert('მობილურ ნომერზე ვერ მოხერხდა პინკოდის გაგზავნა')
                }
            })
        })

    }









    return (
        <SafeAreaView style={styles.Container}>
            <TouchableOpacity
                onPress={() => nav.goBack()}
                style={styles.GoBack}>
                <Image source={require('../Photos/goback.png')}
                    style={styles.GobackIcon}
                />
                <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => GetPin()}
                style={styles.ForgBtn}
            >
                <Text style={styles.UnivText}>პროფილის წაშლა</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>ნამდვილად გსურთ პროფილის წაშლა ?</Text>
                        <TextInput
                            placeholderTextColor="#A0A0A0"
                            placeholder='შეიყვანეთ პინკოდი'
                            style={styles.LogInp}
                            defaultValue={''}
                            onChangeText={(e) => setPincode(e)}
                            value={pincode}
                            keyboardType='numeric'
                        />
                        <View style={styles.flexible}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => UserDeactivation(pincode)}>
                                <Text style={styles.textStyle}>წაშლა</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setPincode(null)
                                    nav.navigate('Home')
                                }
                                }>
                                <Text style={styles.textStyle}>გაუქმება</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>


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



    ForgBtn: {
        backgroundColor: '#ed8d2d',
        borderRadius: 5,
        padding: 12,
        width: 180,
        alignItems: 'center',
        marginTop: 30,
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
    //MODAL
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: '80%',
        height: 180,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#fcd895',
    },
    textStyle: {
        color: 'black',
        fontWeight: '400',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    flexible: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    LogInp: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#fcd895',
        borderRadius: 8,
        width: '80%',
        padding: 10,
    },

    //MODAL
})