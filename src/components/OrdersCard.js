import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { API } from '../API/APIs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setCartTotalLoad, setLoadCartSum } from '../store/User/userActCreat'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import { CartSumData, SaveCart } from '../logic/CartLogic'
import {DevSettings} from 'react-native';








export default function OrdersCard({cart}) {
   const dispatch = useDispatch()
   const [token, setToken] = useState(null)
   const nav = useNavigation()
   const [imageError, setImageError] = useState(true)
 


  


   useEffect(() => {
     
   }, [imageError])
   



   function financial2(x) {
    return Number.parseFloat(x).toFixed(2);
    }


   const SetTOKENNN = async () => {
     const TOKEN = await AsyncStorage.getItem('TOKEN')
     .then((value) => setToken(value))
 }
 
 
 
 useEffect(() => {
   if (token == null || token == undefined) {
       SetTOKENNN()
   } else {
       null
   }
 
 }, [token])


    useEffect(() => {
      
    }, [cart])

    const onImageNotFound = () => {
        setImageError(false);
      }

      const removeUserCart = async () => {
        await AsyncStorage.removeItem('UserCart')
     }



      const REPAY = (item) => {
        fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ApiMethod: 'RePay',
                  controller: 'Customers',
                  pars: {
                      ORDER_ID: item,
                      TOKEN: token,
                  },
                }),
            }).then(db =>{
                  db.json().then(async json => { 
                    if(json.status === 'success' )
                    {    
                     await removeUserCart()      
                     Linking.openURL(json.data)
                     DevSettings.reload()                     
                  } 
                })             
              })
      }
      
      
      
      const REORDER = (item) => {
      fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   ApiMethod: 'ReOrder',
                   controller: 'Customers',
                   pars: {
                       ORDER_ID: item,
                       TOKEN: token,
                   },
                }),
            }).then(db =>{
                  db.json().then(async json => {   
                    if(json.status === 'success' )
                    {    
                      await removeUserCart()
                      {json.data.forEach(async (items, idx) => {
                       await SaveCart(items, Number(items.PRODUCT_CART_COUNT))
                      })} 
                      dispatch(setLoadCartSum(true))
                      dispatch(setCartTotalLoad(true))
                      await nav.navigate('Cart')
                   
                  } else {
                    Alert.alert('ყურადღება','ოპერაციის განმეორება შეუძლებელია')
                  }
                })             
              })
      }



    
    
  return (
      

    <View style={styles.container} >
      
      <View style={styles.flexibleCont}>
      { Number(cart.ORDER_POS) == -1 ? (    
          <View style={styles.OrderProcess}>
          <Image source={require('../Photos/canceled.png')}
        style={styles.OrdProIco} 
        />
          </View>
          ) : (
          Number(cart.ORDER_POS) == 0 ? (
            <View style={styles.OrderProcess}>
            <Image source={require('../Photos/bankcard.png')}
          style={styles.OrdProIco} 
          />
            </View>
          ) : (
            Number(cart.ORDER_POS) == 1 ? (
              <View style={styles.OrderProcess}>
        <Image source={require('../Photos/packingp.png')}
      style={styles.OrdProIco} 
      />
        </View>
          ) : (
            Number(cart.ORDER_POS) == 2 ? (
              <View style={styles.OrderProcess}>
        <Image source={require('../Photos/packed.png')}
      style={styles.OrdProIco} 
      />
        </View>
          ) : (
            Number(cart.ORDER_POS) == 3 ? (
              <View style={styles.OrderProcess}>
        <Image source={require('../Photos/deliverip.png')}
      style={styles.OrdProIco} 
      />
        </View>
          ) : (
            Number(cart.ORDER_POS) == 4 ? (
              <View style={styles.OrderProcess}>
        <Image source={require('../Photos/delivering.png')}
      style={styles.OrdProIco} 
      />
        </View>        
          ) : (
            Number(cart.ORDER_POS) == 5 ? (
              <View style={styles.OrderProcess}>
              <Image source={require('../Photos/delivered.png')}
            style={styles.OrdProIco} 
            />
              </View>
          ) : (
            Number(cart.ORDER_POS) == 6 ? (
              <View style={styles.OrderProcess}>
              <Image source={require('../Photos/done1.png')}
            style={styles.OrdProIco} 
            />
              </View>
          ) : (null)
          )  ) )  ) ) ) )                    
         }
        
          <Text style={styles.ordersTXT}>N - ({cart.UID})</Text>
          <Text style={styles.ordersTXT}>პროდუქტების რაოდენობა - ({cart.ITEM_COUNT})</Text>
          <Text style={styles.ordersTXT}>შეკვეთის ღირებულება - {financial2(cart.ORDER_TOTAL)}₾</Text>
          <View style={styles.IMGCONT}>
          {!!cart > 0 ? (
            cart.ITEMS.map((img, idx) => {
              if(idx <= 4)
              return (
          <FastImage
                    key={idx}
                    style={styles.CartIMG}
                    source={
                        imageError ?
                          { uri: 'https://cdn.mego.ge/' + img.DEF_IMAGE,
                          headers: { Authorization: 'someAuthToken' },
                          priority: FastImage.priority.normal, }
                          : { uri: 'https://cdn.mego.ge/logoshare.jpg',
                          headers: { Authorization: 'someAuthToken' },
                          priority: FastImage.priority.normal, }
                    }
                    resizeMode={FastImage.resizeMode.stretch}
                    onError={() => onImageNotFound()}
                    />
                    )
              })
              ): (null)}
          </View>
          <Text style={styles.ordersTXT}>თარიღი - ({cart.ORDER_DATE})</Text>
          <View style={styles.flexible}>

         {cart.ORDER_POS == 0 && cart.PAY_TYPE == 1 ? (
         <View style={styles.BTNCHECK}>

           <TouchableOpacity style={styles.BuyBtn}
           onPress={() => REPAY(cart.UID)}
           >
             <Text style={styles.TXTBTN}>ხელახლა გადახდა</Text>
           </TouchableOpacity>
         </View>
         ) : (null)}
         <View style={styles.BTNCHECK}>
           <TouchableOpacity style={styles.CancBtn}
           onPress={async () => {
                
               await REORDER(cart.UID)
               await CartSumData()
               
           }
        }
           >
             <Text style={styles.TXTBTN}>შეკვეთის განმეორება</Text>
           </TouchableOpacity>
         </View>
             </View>
        

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: 220,
      backgroundColor: 'white',
      marginBottom: 20,
      borderRadius: 15,
      padding: 5,
      flexDirection: 'row',
      position: 'relative',
      ...Platform.select({
        android: {
          height: 220,
          marginTop: 10,
        }
      })
    },
    flexibleCont: {
        width: '95%',
        padding: 5,
        alignItems: 'flex-start',
        position: 'relative',
    },
    IMGCONT: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
    },
    CartIMG: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ed8d2d',
        borderStyle: 'solid',
        borderRadius: 15,
    },
    ordersTXT: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 3,
        fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    },
    
      BuyBtn: {
        width: '80%',
        height: 40,
        backgroundColor:  '#ed8d2d',
        borderRadius: 15,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      CancBtn: {
        width: '80%',
        height: 40,
        backgroundColor:  'lightgray',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      TXTBTN: {
        fontSize: 10,
        fontFamily: 'Verdana',
        color: 'black', 
        textAlign: 'center',
        padding: 5,
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })

      },
      flexible: {
        flexDirection: 'row',
        alignSelf: 'center',
        margin: 10,
      },
      OrderProcess: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 0,
        top: 5,
      },
      OrdProIco: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
      },
      
      

    
     
    

  })