import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../API/APIs';
import { selectSegments } from '../store/Segments/SegSelector'
import { setSegments, setSegmentsUID } from '../store/Segments/SegActionCreat'
import { SvgCssUri } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { setLoading } from '../store/User/userActCreat';
import DraggablePopup from '../components/DraggablePopup';


const MainScreen = ({ navigation }) => {
    const nav = useNavigation()
    const SEGMENT = useSelector(selectSegments)
    const dispatch = useDispatch()


    const toSegments = (UID) => {
        dispatch(setSegmentsUID(UID))
        dispatch(setLoading(true))
        nav.navigate('DrawerNavigator', { screen: 'Specs', params: { static: true } })

    }

    const toSegmentsDinamic = (UID, catName) => {
        dispatch(setSegmentsUID(UID))
        nav.navigate('CategoryNavigator', { screen: 'ChildCateg', params: { ChildId: UID, Name: catName } })

    }

    useEffect(() => {
        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ApiMethod: 'GetSegments',
                controller: 'Category',
                pars: { lang: 'GE', },
            }),
        }).then(db => {
            db.json().then(json => {
                if (json.status === 'success') {
                    dispatch(setSegments(json.data))

                }
            })
        })
    }, [])



    // akofisher
    // X-TEN720



    useEffect(() => {

    }, [SEGMENT])




    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <DraggablePopup />
            <Text style={styles.MainHeader}>თქვენ უკვეთავთ ჩვენ მოგვაქვს, თქვენი მეგობარი</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.MainCont}>

                <TouchableOpacity
                    onPress={() =>
                        toSegments("1222")
                    }
                    style={styles.CategCont}>
                    <View style={styles.CategImage}>

                        <Image
                            source={require('../Photos/img/icons/sale.png')}
                            style={styles.LogImg}
                        />
                    </View>
                    <Text style={styles.CategName}>ფასდაკლება</Text>
                </TouchableOpacity>


                {SEGMENT.length >= 0 ? (
                    SEGMENT.map((item, idx) => {
                        if (Number(item.ACTIVE) == 1) {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        toSegmentsDinamic(item.UID, item.CATEGORY_NAME)

                                    }
                                    }
                                    style={styles.CategCont} key={idx}>
                                    <View style={styles.CategImage}>
                                        <SvgCssUri
                                            width={50} height={50}
                                            uri={`https://cdn.mego.ge/segimages/${item.SEG_ICON}`}
                                            style={styles.LogImg}
                                        />
                                    </View>
                                    <Text style={styles.CategName}>{item.CATEGORY_NAME}</Text>
                                </TouchableOpacity>
                            )

                        } else {
                            return (
                                <TouchableOpacity
                                    disabled
                                    onPress={() => {
                                        toSegmentsDinamic(item.UID)

                                    }
                                    }
                                    style={styles.CategCont1} key={idx}>
                                    <View style={styles.CategImage}>
                                        <SvgCssUri
                                            width={50} height={50}
                                            uri={`https://cdn.mego.ge/segimages/${item.SEG_ICON}`}
                                            style={styles.LogImg}
                                        />
                                    </View>
                                    <Text style={styles.CategName}>{item.CATEGORY_NAME}</Text>
                                </TouchableOpacity>

                            )
                        }

                    })
                ) : (
                    null
                )}





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
        // zIndex: 2,

    },
    MainHeader: {
        color: '#ed8d2d',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 30,
        paddingBottom: 20,
        fontFamily: 'Verdana',
        ...Platform.select({
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    MainCont: {
        minWidth: '100%',
        alignItems: 'center',
        paddingBottom: 80,
        // zIndex: 999,
        ...Platform.select({
            android: {
                paddingBottom: 80,
            }
        })
    },
    CategCont: {
        width: '60%',
        height: 120,
        backgroundColor: 'white',
        marginTop: 40,
        borderRadius: 15,
    },
    CategCont1: {
        width: '60%',
        height: 120,
        backgroundColor: 'white',
        marginTop: 40,
        borderRadius: 15,
        opacity: 0.5,
    },
    CategImage: {
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    CategName: {
        alignSelf: 'center',
        fontSize: 14,
        padding: 5,
        fontFamily: 'Verdana',
        color: 'black',
        ...Platform.select({
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    LogImg: {
        resizeMode: 'contain',

    }
})



export default MainScreen