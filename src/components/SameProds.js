import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSameProd } from '../store/Products/prodSelector'
import { setSameProd } from '../store/Products/prodActCreat'
import { API } from '../API/APIs'
import ProdCard from './ProdCard'




export default function SameProds({ data }) {
    const dispatch = useDispatch()
    const SameProd = useSelector(selectSameProd)


    useEffect(() => {

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ApiMethod: 'GetRandProductByCat',
                controller: 'Product',
                pars: {
                    CATEGORY_ID: data,
                    OFFSET: '0',
                    ITEM_COUNT: '4',
                },
            }),
        }).then(db => {
            db.json().then(json => {
                if (json) {

                    dispatch(setSameProd(json.data))

                }
            })
        })

    }, [data])





    return (
        <React.Fragment>


            <SafeAreaView style={styles.SameContainer}>
                {SameProd.length > 0 ? (
                    <React.Fragment>

                        <Text style={styles.SameHeader}>მსგავსი პროდუქტები</Text>
                        <View style={styles.CardsCont}>

                            {SameProd.length > 0 ? (
                                SameProd.map((item, idx) => {
                                    if (JSON.parse(item.STEP) !== 0 && JSON.parse(item.PRODUCT_COUNT) > 0) {
                                        return (
                                            <ProdCard item={item} key={idx} />
                                        )
                                    } else if (JSON.parse(item.PRODUCTIVE) == 1) {
                                        return (
                                            <ProdCard item={item} key={idx} />
                                        )
                                    }
                                })
                            ) : (
                                null
                            )}
                        </View>
                    </React.Fragment>
                ) : (
                    null
                )}


            </SafeAreaView>

        </React.Fragment>
    )
}


const styles = StyleSheet.create({
    SameContainer: {
        minWidth: '100%',
        alignItems: 'center',
        ...Platform.select({
            android: {
                marginBottom: 100,
            }
        })
    },
    SameHeader: {
        color: '#ed8d2d',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 40,
        paddingBottom: 20,
        fontFamily: 'Verdana',
        ...Platform.select({
            android: {
                fontFamily: 'Roboto',
                paddingTop: 80,
                paddingBottom: 30,
            }
        })
    },
    CardsCont: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,

    }
})