import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import FastImage from 'react-native-fast-image'
import { RemoveFromCart, GetCartCount,ChangeCartItemCount, CartSumData, LoadCart, SaveCart  } from '../logic/CartLogic'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishItem, setCardCount } from '../store/Products/prodActCreat'
import { setBeerLoad, setCartTotalLoad, setSpecsLoad,  setLoadCartSum} from '../store/User/userActCreat'
import { selectLoadCartSum } from '../store/User/userSelector'
import { selectCardCount } from '../store/Products/prodSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API } from '../API/APIs'









export default function WishQuantity({cart}) {
    const [prodCount, setProdCount] = useState(cart.STEP)
    const dispatch = useDispatch()
    const CARDCOUNTER = GetCartCount()
    const [chng, setChng] = useState(true)
    const [imageError, setImageError] = useState(true)
    const [tok, setTok] = useState(null)


    useEffect(() => {
        const TOKEN =  AsyncStorage.getItem('TOKEN')
        .then((value) => setTok(value))
      
      }, [tok])
  


    function financial(x) {
        return Number.parseFloat(x).toFixed(3);
    }
    
    function financial2(x) {
    return Number.parseFloat(x).toFixed(2);
    } 
    
    function financial3(x) {
        return Number.parseFloat(x).toFixed(0);
        } 
  
    const increseQuantity = async () => {
        if (prodCount < cart.PRODUCT_COUNT) {
            await setProdCount(prodCount + Number(cart.STEP))
            await dispatch(setLoadCartSum(true))
        }
        
    }
  
    const decreaseQuantity = async () => {
        if (prodCount > Number(cart.STEP)) {
            await setProdCount(prodCount - Number(cart.STEP))
            await dispatch(setLoadCartSum(true))
        }
    }
  
    useEffect(() => {
        if(prodCount <= cart.MINWEIGHT) {
          setProdCount(Number(cart.MINWEIGHT))
        }
        
      }, [prodCount])

      const SETCARD =  (dt, pr) => {
       SaveCart(dt, pr )
       CartSumData()
       setChng(false) 
        if(chng == false) {
          setChng(true)
        }
    }


    useEffect(() => {
        
    }, [CARDCOUNTER])
    
    useEffect( () => {
        GetCartCount()
         dispatch(setCardCount(CARDCOUNTER))
         dispatch(setLoadCartSum(true))
    }, [chng])


  const onImageNotFound = () => {
      setImageError(false);
    }

    useEffect(() => {
    }, [cart])


    const DeleteWishItem = (UID) =>
          {   
      fetch(API, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ApiMethod: 'DelWishListItem',
                controller: 'WishList',
                pars: {
                    PRODUCT_ID: UID,
                    TOKEN: tok,
                },
              }),
          }).then(db =>{
                db.json().then(json => {            
                if(json.status === 'success' )
                {                    
                                           
                   
                } 
              })             
            })
            
          }



    
  return (
      

    <View style={styles.container} >
      <TouchableOpacity
      onPress={async () => {
        await DeleteWishItem(cart.UID)
        await dispatch(removeWishItem(cart.UID))

      }}
      style={styles.cartDelete1}
      >
       <Image source={require('../Photos/cancel.png')}
      style={styles.cartDelete} 
      />
      </TouchableOpacity>
    <FastImage
                    style={styles.CartIMG}
                    source={
                        imageError ?
                          { uri: 'https://cdn.mego.ge/' + cart.DEF_IMAGE,
                          headers: { Authorization: 'someAuthToken' },
                          priority: FastImage.priority.normal, }
                          : { uri: 'https://cdn.mego.ge/logoshare.jpg',
                          headers: { Authorization: 'someAuthToken' },
                          priority: FastImage.priority.normal, }
                    }
                    resizeMode={FastImage.resizeMode.stretch}
                    onError={() => onImageNotFound()}
                    />
      <View style={styles.flexibleCont}>
        <View>

      <Text style={styles.txt} numberOfLines={1}>{cart.PRODUCT_NAME}</Text>
        </View>
        <View style={styles.quant}>
        <View style={styles.CardCounter}>
        {cart.COUNT_TYPE == 2 || cart.COUNT_TYPE_NAME == 'კგ' ? (
          <View style={styles.weightConT}>
          
          <View style={styles.CardCounter}>
           <TouchableOpacity 
        onPress={() => {
          decreaseQuantity()
                 }}
        style={styles.CountBtns}>
            <Text style={styles.BtnTxts}>-</Text>
        </TouchableOpacity>
        <Text style={styles.CountTotal}>{financial(prodCount)}</Text>
        <TouchableOpacity 
        onPress={() => {
          increseQuantity()
                   }}
        style={styles.CountBtns}>
            <Text style={styles.BtnTxts}>+</Text>

        </TouchableOpacity>
          </View>
          <View style={styles.weigh}>

          <Text style={styles.CountTotal}>{cart.SALE_PERCENT > 0 && cart.SALE_PRICE > 0 ? (
            financial2(cart.SALE_PRICE * prodCount )
            ) : (
              financial2(cart.PRODUCT_PRICE * prodCount )
              )
            }₾</Text> 
            </View>
          </View>
       
        ) : (
         <React.Fragment>
            <TouchableOpacity 
        onPress={() => {
          decreaseQuantity()
                 }}
        style={styles.CountBtns}>
            <Text style={styles.BtnTxts}>-</Text>
        </TouchableOpacity>
        <Text style={styles.CountTotal}>{financial3(prodCount)}</Text>
        <TouchableOpacity 
        onPress={() => {
          increseQuantity()
                  }}
        style={styles.CountBtns}>
            <Text style={styles.BtnTxts}>+</Text>

        </TouchableOpacity>
         </React.Fragment>
        ) }
       
        </View>
        </View>
       
         <TouchableOpacity
         style={styles.AddtoCartbtn}
         onPress={() => SETCARD(cart, prodCount)}
         >
             <Text style={styles.addTXT}>კალათაში დამატება</Text>

         </TouchableOpacity>
        

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: 130,
      backgroundColor: 'white',
      marginBottom: 20,
      borderRadius: 15,
      padding: 5,
      flexDirection: 'row',
      position: 'relative',
  },
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
    fontSize: 16,
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
  flexibleCont: {
    width: '65%',
    padding: 10,
    alignItems: 'center',
  },
  quant: {
    width: '100%',
    alignSelf: 'center',
    padding: 15,
  },
 
  cartDelete: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    tintColor: '#ed8d2d',
    

  },
  cartDelete1: {
    width: 35,
    height: 35,
    position: 'absolute',
    right: -10,
    top: -10,

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
    weightConT: {
      flexDirection: 'row',
    },
    weigh: {
      backgroundColor: '#ed8d2d',
      padding: 2,
      borderRadius: 10,
      marginLeft: 15,
    },
    AddtoCartbtn: {
        width: '80%',
        height: 35,
        backgroundColor: '#ed8d2d',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTXT: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 5,
        fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    }

  })