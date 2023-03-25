import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Spinner, ScrollView } from 'react-native'
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../API/APIs';
import { selectChildSeg, selectSegmentsUID } from '../store/Segments/SegSelector'
import { setChildSeg, setSegmentsUID } from '../store/Segments/SegActionCreat'
import { SvgCssUri } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { setLoading } from '../store/User/userActCreat';
import DraggablePopup from '../components/DraggablePopup';
import FastImage from 'react-native-fast-image';
import Loader from '../components/Loader';


const ChildCategScreen = ({ route, navigation }) => {
    const { ChildId, Name } = route.params
    const nav = useNavigation()
    const segUID = useSelector(selectSegmentsUID)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const SEGMENT = useSelector(selectChildSeg)






    const toSegmentsDinamic = (UID, catName) => {
        dispatch(setSegmentsUID(UID))
        nav.navigate('CategoryNavigator', { screen: 'DownChildCateg', params: { DownChildId: UID, Name: catName, } })

    }


    useEffect(() => {
        setLoading(true)

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ApiMethod: 'GetAllCategories',
                controller: 'Category',
                pars: {
                    lang: 'GE',
                    SEG_ID: ChildId
                },
            }),
        }).then(db => {
            db.json().then(json => {

                if (json.status === 'success') {
                    dispatch(setChildSeg(json.data))
                    // dispatch(setCategory(json.data))
                    setLoading(false)

                }
            })
        })
    }, [ChildId])





    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <DraggablePopup />
            <TouchableOpacity
                onPress={() => nav.goBack()}
                style={styles.GoBack}>
                <Image source={require('../Photos/goback.png')}
                    style={styles.GobackIcon}
                />
                <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>

            </TouchableOpacity>
            <Text style={styles.MainHeader}>{Name}</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.MainCont}>





                {loading == false && SEGMENT.length > 0 ? (
                    SEGMENT.map((item, idx) => {
                        if (Number(item.PARENT_UID) == 1) {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        toSegmentsDinamic(item.UID, item.CATEGORY_NAME)

                                    }
                                    }
                                    style={styles.CategCont} key={idx}>
                                    <View style={styles.CategImage}>
                                        {/* {item.SUB_SEG_ICON !== null && item.SUB_SEG_ICON !== undefined ? (
                                            <SvgCssUri
                                                width={50} height={50}
                                                uri={`https://cdn.mego.ge/segimages/${item.SUB_SEG_ICON}`}
                                                style={styles.LogImg}
                                            />
                                        ) : (
                                            )} */}
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
                    <Loader />
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
        minHeight: '100%',
        alignItems: 'center',
        paddingBottom: 140,
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



export default ChildCategScreen