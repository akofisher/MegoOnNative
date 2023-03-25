import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { setSearchRes, setSearchOpen, setSearch } from '../store/Search/searchActCreat'
import { useDispatch } from 'react-redux'


export default function SearchCard({item}) {
    const [imageError, setImageError] = useState(true)
    const nav = useNavigation()
    const dispatch = useDispatch()

    const onImageNotFound = () => {
        setImageError(false);
      }

    function financial2(x) {
        return Number.parseFloat(x).toFixed(2);
        }

        const toSingleProd = (ID) => {
          dispatch(setSearchRes(''))
          dispatch(setSearchOpen(false))
          dispatch(setSearch([]))
          nav.navigate( 'SingleProd', {uidd: ID} )
      }




  return (
      <React.Fragment>
    <TouchableOpacity 
    onPress={() => toSingleProd(item.UID)}
    >
    <View style={styles.Results}>
    <FastImage
                    style={styles.resImg}
                    source={
                        imageError ?
                          { uri: 'https://cdn.mego.ge/' + item.DEF_IMAGE,
                          headers: { Authorization: 'someAuthToken' },
                          priority: FastImage.priority.normal, }
                          : { uri: 'https://cdn.mego.ge/logoshare.jpg',
                          headers: { Authorization: 'someAuthToken' },
                          priority: FastImage.priority.normal, }
                    }
                    resizeMode={FastImage.resizeMode.contain}
                    onError={() => onImageNotFound()}
                    />
    <Text numberOfLines={1} style={styles.resTxt}>{item.PRODUCT_NAME}</Text>
    <Text numberOfLines={1} style={styles.resTxt}>{financial2(item.PRODUCT_PRICE)} ₾</Text>
    </View>
    </TouchableOpacity>
        </React.Fragment>
  )
}

const styles = StyleSheet.create({
    Results: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 0.5,
        
      },
      resImg: {
        width: 70,
        height: 60,
        resizeMode: 'contain',
        ...Platform.select({
          android: {
            height: '100%',
            width: '20%',
          }
        })
       
      },
      resTxt: {
        fontSize: 12,
        maxWidth: '60%',
        overflow: 'hidden',
        paddingLeft: 15,
        fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
        
      },
})