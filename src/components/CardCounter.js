import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CartSumData, GetCartCount, SaveCart } from '../logic/CartLogic'
import { useDispatch, useSelector } from 'react-redux'
import { setCardCount } from '../store/Products/prodActCreat'
import { setLoadCartSum, setWishLoad } from '../store/User/userActCreat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API } from '../API/APIs'
import { selectLogedin } from '../store/User/userSelector'
import { useNavigation } from '@react-navigation/native'



export default function CardCounter({ data }) {
    const [prodCount, setProdCount] = useState(data.STEP)
    const dispatch = useDispatch()
    const CARDCOUNTER = GetCartCount()
    const [chng, setChng] = useState(true)
    const [toke, setToke] = useState(null)
    const [price, setPrice] = useState('')
    const [weighAlert, setWeighAlert] = useState(0)
    const [weight, setWeight] = useState('')
    const USERLOGEDIN = useSelector(selectLogedin)
    const nav = useNavigation()



    useEffect(() => {
        if (weighAlert == 1) {
            return Alert.alert('ყურადღება', 'ასაწონი პროდუქცია! გთხოვთ გაითვალისწინოთ მოცულობასთან შეფარდებული დაახლოებითი წონა! (მაგალითად საზამთრო საშუალოდ იწონის 10კგ) თქვენი მითითებული წონა დაკორექტირებული იქნება ავტომატურად. დიდი სხვაობის შემთხვევაში დაგიკავშირდებათ კონსულტანტი')
        }
    }, [weighAlert])


    const SetTOKENNN = async () => {
        const TOKEN = await AsyncStorage.getItem('TOKEN')
            .then((value) => setToke(value))
    }



    useEffect(() => {
        if (toke == null || toke == undefined) {
            SetTOKENNN()
        } else {
            null
        }

    }, [toke])

    useEffect(() => {

    }, [USERLOGEDIN])



    const SaveToWish = (UID) => {

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ApiMethod: 'SaveWishList',
                controller: 'WishList',
                pars: {
                    PRODUCT_ID: UID,
                    TOKEN: toke,
                },
            }),
        }).then(db => {
            db.json().then(json => {
                if (json.status === 'success') {


                } else {
                    Alert.alert('ყურადღება', 'სამწუხაროდ პროდუქტის დამატება ვერ მოხერხდა')
                }
            })
        })


    }






    function financial(x) {
        return Number.parseFloat(x).toFixed(3);
    }

    function financial2(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    const increseQuantity = async () => {
        if (prodCount < data.PRODUCT_COUNT) {
            await setProdCount(prodCount + Number(data.STEP))
            await dispatch(setLoadCartSum(true))
        }

    }

    const decreaseQuantity = async () => {
        if (prodCount > Number(data.STEP)) {
            await setProdCount(prodCount - Number(data.STEP))
            await dispatch(setLoadCartSum(true))
        }
    }

    useEffect(() => {
        if (prodCount <= data.MINWEIGHT) {
            setProdCount(Number(data.MINWEIGHT))
        }

    }, [prodCount])



    const SETCARD = (dt, pr) => {
        SaveCart(dt, pr)
        CartSumData()
        setChng(false)
        if (chng == false) {
            setChng(true)
        }
    }

    useEffect(() => {

    }, [CARDCOUNTER])

    useEffect(() => {
        GetCartCount()
        dispatch(setCardCount(CARDCOUNTER))
        dispatch(setLoadCartSum(true))
    }, [chng])

    const HandPrice = (val) => {
        let totall;
        totall = price / val
        setProdCount(Number(totall))
    }

    const HandWeight = (val) => {
        if (Number(val) <= Number(data.MINWEIGHT)) {
            setProdCount(Number(data.MINWEIGHT))
        } else if (Number(val) > Number(data.PRODUCT_COUNT)) {

            setProdCount(Number(data.PRODUCT_COUNT))
        } else {

            setProdCount(Number(val))
        }
    }




    return (


        <View>

            <View style={styles.CardCounter}>

                {data.COUNT_TYPE == 2 || data.COUNT_TYPE_NAME == 'კგ' ? (
                    <View style={styles.weCNT}>
                        <TouchableOpacity
                            onPress={() => decreaseQuantity()}
                            style={styles.CountBtns}>
                            <Text style={styles.BtnTxts}>-</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.CountT}
                            defaultValue={`${financial(prodCount)}კგ`}
                            onEndEditing={() => {
                                HandWeight(weight)

                            }}
                            onChangeText={val => setWeight(val)}
                            value={Number(financial(prodCount))}
                            keyboardType="numeric"
                            placeholderTextColor='black'
                            textAlign='center'
                            clearTextOnFocus={true}
                        />

                        <TouchableOpacity
                            onPress={() => increseQuantity()}
                            style={styles.CountBtns}>
                            <Text style={styles.BtnTxts}>+</Text>

                        </TouchableOpacity>
                    </View>
                ) : (
                    <React.Fragment>

                        <TouchableOpacity
                            onPress={() => decreaseQuantity()}
                            style={styles.CountBtns}>
                            <Text style={styles.BtnTxts}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.CountTotal}>{prodCount}</Text>
                        <TouchableOpacity
                            onPress={() => increseQuantity()}
                            style={styles.CountBtns}>
                            <Text style={styles.BtnTxts}>+</Text>

                        </TouchableOpacity>
                    </React.Fragment>

                )}


            </View>
            <View style={styles.InputCont}>
                {data.COUNT_TYPE == 2 || data.COUNT_TYPE_NAME == 'კგ' ? (
                    <View style={styles.weightCont}>
                        <TextInput
                            style={styles.inputPrice}
                            defaultValue={""}
                            onEndEditing={() => {
                                data.SALE_PERCENT > 0 && data.SALE_PRICE > 0 ? (
                                    HandPrice(data.SALE_PRICE)
                                ) : (
                                    HandPrice(data.PRODUCT_PRICE)
                                )

                            }}
                            onChangeText={val => setPrice(val)}
                            value={Number(price)}
                            keyboardType="numeric"
                            placeholderTextColor='black'
                            textAlign='center'
                            clearTextOnFocus={true}
                            placeholder={'ჩაწერეთ თანხა'}
                            onFocus={() => {
                                if (weighAlert == 0) {
                                    setWeighAlert(1)
                                } else {
                                    setWeighAlert(2)
                                }
                            }}
                            onBlur={() => {
                                setChng(false)
                                if (chng == false) {
                                    setChng(true)
                                }

                            }}
                        />

                        {/* <Text style={styles.CountTotal}>{data.SALE_PERCENT > 0 && data.SALE_PRICE > 0 ? (
        financial2(data.SALE_PRICE * prodCount )
        ) : (
            financial2(data.PRODUCT_PRICE * prodCount )
            )
        }₾</Text>  */}
                    </View>
                ) : (null)}
            </View>



            <View style={styles.IconsCont}>

                <TouchableOpacity
                    onPress={() => SETCARD(data, prodCount)}
                >
                    <Image
                        source={require('../Photos/shopingCart.png')}
                        style={styles.CardIcons1}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={async () => {
                        if (USERLOGEDIN.isLogedin == true) {
                            await SaveToWish(data.UID)
                            await dispatch(setWishLoad(true))

                        } else {
                            Alert.alert('ყურადღება',
                                'სურვილების სიაში პროდუქტის დასამატებლად გთხოვთ გაიაროთ ავტორიზაცია ',
                                [
                                    {
                                        text: "ავტორიზაცია",
                                        onPress: () => nav.navigate('Login'),
                                    },
                                    {
                                        text: "გაუქმება",

                                    },
                                ],
                            )

                        }

                    }}
                >
                    <Image
                        source={require('../Photos/wish.png')}
                        style={styles.CardIcons2}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    CardCounter: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    CountBtns: {
        width: 24,
        height: 24,
        backgroundColor: '#ed8d2d',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    BtnTxts: {
        fontSize: 18,
        fontFamily: 'Verdana',
        color: 'black',
        ...Platform.select({
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    CountTotal: {
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        fontFamily: 'Verdana',
        color: 'black',
        ...Platform.select({
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    CardIcons1: {
        width: 35,
        height: 35,
        resizeMode: 'stretch',
    },
    CardIcons2: {
        width: 40,
        height: 40,
        resizeMode: 'stretch',
    },
    IconsCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    weightCont: {
        backgroundColor: '#fcd895',
        borderRadius: 10,
    },
    InputCont: {
        width: '80%',
        height: 30,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 2,
    },
    inputPrice: {
        fontSize: 10,
        padding: 3,
    },
    CountT: {
        fontSize: 14,
        padding: 2,
        alignSelf: 'center',
    },
    weCNT: {
        flexDirection: 'row',
        alignItems: 'center',
    },


})