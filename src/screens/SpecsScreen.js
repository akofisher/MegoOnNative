import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../API/APIs';
import SegmentScreen from './SegmentScreen';
import { setProducts } from '../store/Products/prodActCreat';
import { selectProducts } from '../store/Products/prodSelector';
import ProdCard from '../components/ProdCard';
import { selectSpecsLoad } from '../store/User/userSelector';
import { setSpecsLoad } from '../store/User/userActCreat';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';


const card = ({ item }) => {
    return (
        <ProdCard item={item} />
    )
}


const Specs = (props) => {
    const specProd = useSelector(selectProducts)
    const dispatch = useDispatch()
    const nav = useNavigation()
    const Load = useSelector(selectSpecsLoad)


    const FetchingSpecs = () => {
        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ApiMethod: 'GetSponsoredProducts',
                controller: 'Product',
                pars: {},
            }),
        }).then(db => {
            db.json().then(json => {
                if (json.status === 'success') {
                    dispatch(setProducts(json.data))
                }
            })
        })

    }

    useEffect(() => {
        if (Load) {
            FetchingSpecs()
            dispatch(setSpecsLoad(false))
        }
    }, [Load])






    useEffect(() => {
        FetchingSpecs()

    }, [])

    return (

        <SegmentScreen>

            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => nav.goBack()}
                    style={styles.GoBack}>
                    <Image source={require('../Photos/goback.png')}
                        style={styles.GobackIcon}
                    />
                    <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>

                </TouchableOpacity>
                {Load ? (
                    <Loader />
                ) : (
                    <React.Fragment>

                        {specProd.length > 0 ? (

                            <SafeAreaView style={styles.specsContainer}>
                                <Text style={styles.specHeader}>სპეც შეთავაზება</Text>
                                <FlatList
                                    data={specProd}
                                    renderItem={card}
                                    keyExtractor={item => item.UID}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    numColumns={2}
                                    key={2}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </SafeAreaView>
                        ) :
                            (null)}
                    </React.Fragment>

                )}

            </View>



        </SegmentScreen>

    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcd895',
        alignItems: 'center',
        marginBottom: 150,
    },
    specsContainer: {
        minWidth: '100%',
        alignItems: 'center',
        paddingBottom: 180,
        ...Platform.select({
            android: {
                marginBottom: 100,
            }
        })
    },
    specHeader: {
        color: '#ed8d2d',
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 20,
        fontFamily: 'Verdana',
        ...Platform.select({
            android: {
                paddingTop: 80,
                paddingBottom: 30,
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



export default Specs
