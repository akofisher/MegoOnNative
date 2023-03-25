import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView} from 'react-native'
import Loader from '../components/Loader'
import CartQuantity from '../components/CartQuantity'
import { useSelector, useDispatch } from 'react-redux'
import { selectCardCount } from '../store/Products/prodSelector'
import { useNavigation } from '@react-navigation/native'
import { selectCartTotalLoad, selectLoadCartSum, selectLogedin, selectWishLoad } from '../store/User/userSelector'
import { setCartTotalLoad, setLoadCartSum, setWishLoad } from '../store/User/userActCreat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GetCartCount, CartSumData, LoadCart } from '../logic/CartLogic'
import {selectWishProd} from '../store/Products/prodSelector'
import { setWishProd, removeWishItem } from '../store/Products/prodActCreat'
import { API } from '../API/APIs'
import WishQuantity from '../components/WishQuantity'
import ThirdHeader from '../components/ThirdHeader'
import DraggablePopup from '../components/DraggablePopup'


export default function WishScreen() {
  const dispatch = useDispatch()
  const WISHPROD = useSelector(selectWishProd)
  const [token, setToken] = useState(null)
  const nav = useNavigation()
  const WISHLOAD = useSelector(selectWishLoad)
  const USERLOGEDIN = useSelector(selectLogedin)


  useEffect(() => {
    
  }, [USERLOGEDIN])
  


  useEffect(() => {
    
  }, [WISHPROD])


  useEffect(() => {
    if(WISHLOAD == true) {
      setTimeout(() => {
        dispatch(setWishLoad(false))
       }, 100);
     }
     
   }, [WISHLOAD])
  





  useEffect(() => {
    const TOKEN =  AsyncStorage.getItem('TOKEN')
    .then((value) => setToken(value))
  
  }, [token])


  
  useEffect(() => 
  {
  fetch(API, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          ApiMethod: 'GetWishList',
                  controller: 'WishList',
                  pars: {
                    TOKEN: token,
                  },
      }),
  }).then(db =>{
        db.json().then(json => {            
        if(json.status === 'success' )
        {    
        
        dispatch(setWishProd(json.data))    
              
          
        } 
      })             
    })
    
  }, [WISHLOAD])



  return (
    <SafeAreaView style={styles.container}>
      <ThirdHeader/>
      <DraggablePopup/>
      <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.MainCont}>
      {WISHLOAD ? (
        <Loader/>
      ) : (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.SecContScr}>
        <React.Fragment>

        <TouchableOpacity
            onPress={() =>  nav.goBack()}
            style={styles.GoBack}>
            <Image source={require('../Photos/goback.png')}
      style={styles.GobackIcon} 
      />
      <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>
                
            </TouchableOpacity>
      <SafeAreaView style={styles.cartProdContainer}>
        {WISHPROD.length <= 0 ? (
          <React.Fragment>
            {USERLOGEDIN.isLogedin ? (
              <Text style={styles.CartHeader}>სურვილების სია ცარიელია</Text>
            ) : (
              <Text style={styles.CartHeader}>სურვილების სიის სანახავად გაიარეთ ავტორიზაცია</Text>

            )}
          
          <Image source={require('../Photos/emptyWish.png')}
          style={styles.empty} 
          />
      </React.Fragment>
        ) : (
          <React.Fragment>
             <Text style={styles.CartHeader}>სურვილების სია</Text>
          {WISHPROD == null || WISHPROD == undefined ?  (
                null) : 
                  WISHPROD.map((card, i) =>
                  {
                    
                    return(
                      <WishQuantity cart={card} key={card.UID}/>
                      
                      )
                    }
                    )
                    
                    }
       

          </React.Fragment>
         
         
         )}
       

       

      </SafeAreaView>
         </React.Fragment>
      </ScrollView> 

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
    height: '100%',
    zIndex: 2,
    
},
cartProdContainer: {
  minWidth: '100%',
  height: '100%',
  alignItems: 'center',
  marginBottom: 20,
  marginTop: 30,
  ...Platform.select({
      android: {
        marginBottom: 110,
      }
    })
},
CartHeader: {
  fontSize: 18,
  color: '#ed8d2d',
  paddingBottom: 20,
  fontWeight: 'bold',
  fontFamily: 'Verdana',
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })

},
CartGoBack: {
  fontSize: 15,
  color: 'black',
  paddingBottom: 10,
  fontWeight: 'bold',
  fontFamily: 'Verdana',
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
},
GoBack: {
  alignSelf: 'flex-start',
  paddingLeft: 20,
  paddingTop: 20,
},
empty: {
  width: 100,
  height: 100,
  resizeMode: 'stretch',
  margin: 50,
},
MainCont: {
  minWidth: '100%', 
  alignItems: 'center',
  paddingBottom: 20,
  height: '100%',
  // ...Platform.select({
  //     android: {
  //       paddingBottom: 80,
  //     }
  //   })
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

