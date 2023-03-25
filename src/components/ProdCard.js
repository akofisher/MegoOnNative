import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import CardCounter from './CardCounter';


const ProdCard = ({ item }) => {
    const nav = useNavigation()
    const [imageError, setImageError] = useState(true)

    const onImageNotFound = () => {
        setImageError(false);
    }

    function financial2(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    const toSingleProd = (ID) => {
        nav.navigate('SingleProd', { uidd: ID })
    }



    return (
        <View style={styles.specCard}>
            <TouchableOpacity style={styles.CardIMGBTN}
                onPress={() => toSingleProd(item.UID)}
            >
                <FastImage
                    style={styles.CardIMG}
                    source={
                        imageError ?
                            {
                                uri: 'https://cdn.mego.ge/' + item.DEF_IMAGE,
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.normal,
                            }
                            : {
                                uri: 'https://cdn.mego.ge/logoshare.jpg',
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.normal,
                            }
                    }
                    resizeMode={FastImage.resizeMode.contain}
                    onError={() => onImageNotFound()}
                />
            </TouchableOpacity>
            <View style={styles.prodTxtCont}>
                <Text numberOfLines={1} style={styles.prodTxt}>{item.PRODUCT_NAME}</Text>
                <Text style={styles.prodTxt}>{financial2(item.PRODUCT_PRICE)} ₾</Text>
                <CardCounter data={item} />


            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    specCard: {
        width: '47%',
        height: 290,
        backgroundColor: 'white',
        marginTop: 30,
        borderRadius: 15,
    },
    CardIMG: {
        width: '100%',
        height: 140,
        // resizeMode: 'contain',
        // borderRadius: 15,
    },
    prodTxt: {
        fontSize: 12,
        overflow: 'hidden',
        paddingBottom: 3,
        fontFamily: 'Verdana',
        color: 'black',
        ...Platform.select({
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    prodTxtCont: {
        padding: 6
    },




})



export default ProdCard
