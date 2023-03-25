import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { RemoveFromCart, GetCartCount, ChangeCartItemCount, CartSumData, LoadCart } from '../logic/CartLogic'
import { useDispatch, useSelector } from 'react-redux'
import { setCardCount } from '../store/Products/prodActCreat'
import { setBeerLoad, setCartTotalLoad, setSpecsLoad } from '../store/User/userActCreat'
import { selectLoadCartSum } from '../store/User/userSelector'
import { selectCardCount } from '../store/Products/prodSelector'







export default function CheckoutCards({ cart }) {
  const [imageError, setImageError] = useState(true)
  const [SinglprodCount, setSinglProdCount] = useState(Number(cart.PRODUCT_CART_COUNT))
  const [rem, setRem] = useState(true)
  let COUNTER = GetCartCount()
  const dispatch = useDispatch()
  const [load, setLoad] = useState(true)
  let TOTALSUM = CartSumData()
  const TotalLoad = useSelector(selectLoadCartSum)
  const COUNTOFCART = useSelector(selectCardCount)




  const onImageNotFound = () => {
    setImageError(false);
  }





  useEffect(() => {
  }, [cart])




  return (


    <View style={styles.container} >

      <FastImage
        style={styles.CartIMG}
        source={
          imageError ?
            {
              uri: 'https://cdn.mego.ge/' + cart.DEF_IMAGE,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }
            : {
              uri: 'https://cdn.mego.ge/logoshare.jpg',
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }
        }
        resizeMode={FastImage.resizeMode.stretch}
        onError={() => onImageNotFound()}
      />

      <View>

        <Text style={styles.txt} numberOfLines={1}>{cart.PRODUCT_NAME}</Text>
      </View>




    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 15,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      android: {
        height: 140,
      }
    })
  },


  txt: {
    width: 200,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'black',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  CartIMG: {
    width: '30%',
    height: '80%',
    alignSelf: 'center',

  },




})