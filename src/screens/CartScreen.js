import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView} from 'react-native'
import Loader from '../components/Loader'
import CartQuantity from '../components/CartQuantity'
import { useSelector, useDispatch } from 'react-redux'
import { selectCardCount } from '../store/Products/prodSelector'
import { useNavigation } from '@react-navigation/native'
import { selectCartTotalLoad, selectLoadCartSum, selectLogedin } from '../store/User/userSelector'
import { setCartTotalLoad, setLoadCartSum } from '../store/User/userActCreat'
import { GetCartCount, CartSumData, LoadCart } from '../logic/CartLogic'
import ThirdHeader from '../components/ThirdHeader'
import { setCardCount } from '../store/Products/prodActCreat'
import { selectCheckLoad } from '../store/Checkout/CheckoutSelector'
import { setCheckouLoad } from '../store/Checkout/CheckoutActionCreat'
import DraggablePopup from '../components/DraggablePopup'

export default function CartScreen() {
  const [load, setLoad] = useState(true)
  const CARTDATA = LoadCart()
  const dispatch = useDispatch()
  const count = useSelector(selectCardCount)
  let nav = useNavigation()
  let Total = CartSumData()
  const TotLoad = useSelector(selectLoadCartSum)
  const SumLoad = useSelector(selectCartTotalLoad)
  const CARDCOUNTER = GetCartCount()
  const CheckLoad = useSelector(selectCheckLoad)
  const USERLOGEDIN = useSelector(selectLogedin)

  useEffect(() => {
    
  }, [USERLOGEDIN])
  


  useEffect(() => {
    dispatch(setCardCount(CARDCOUNTER))
  }, [CARDCOUNTER, CheckLoad])
  



  function financial2(x) {
    return Number.parseFloat(x).toFixed(2);
  } 


  useEffect(() => { 
    if(CARTDATA != null || CARTDATA != undefined) {    
      setLoad(false);   
    } 
   }, [CARTDATA]) 

   
   
   useEffect(() => {
     LoadCart()
     GetCartCount()
     if(CheckLoad == true) {
       setTimeout(() => {
         dispatch(setCheckouLoad(false))
        }, 100);
      }
      
    }, [CheckLoad])
   
   useEffect(() => {
     LoadCart()
     if(TotLoad == true) {
       setTimeout(() => {
         dispatch(setLoadCartSum(false))
        }, 100);
      }
      
    }, [TotLoad])


    useEffect(() => {
      LoadCart()
      if(SumLoad == true) {
        setTimeout(() => {
          dispatch(setCartTotalLoad(false))
         }, 100);
       }
       
     }, [SumLoad])
    
    
    useEffect(() => {
      
 
    }, [count])

    useEffect(() => {
      
    }, [Total])
    
  




  return (
    <SafeAreaView style={styles.container}>
      <ThirdHeader/>
      <DraggablePopup/>
      <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.MainCont}>
      {TotLoad || CheckLoad ? (
        <Loader/>
      ) : (
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
        {count <= 0 ? (
          <React.Fragment>
          <Text style={styles.CartHeader}>კალათა ცარიელია</Text>
          <Image source={require('../Photos/emptycart.png')}
          style={styles.empty} 
          />
      </React.Fragment>
        ) : (
          <React.Fragment>
             <Text style={styles.CartHeader}>საყიდლების კალათა</Text>
          {load || CheckLoad ? (
            <Loader/>
            ) : (
              CARTDATA == null || CARTDATA == undefined ?  (
                null) : (
                  Array.from(CARTDATA.values()).map((card, i) =>
                  {
                    
                    return(
                      <CartQuantity cart={card} key={card.UID}/>
                      
                      )
                    }
                    )
                    )
                    )}
         <View style={styles.TotalsCont}>

         <View style={styles.Totals1}>
           <Text style={styles.TotTXT}>პროდუქტები</Text>
           <Text style={styles.TotTXT}>{Total == null ? (null) : (financial2(Total.CartSum))}₾</Text>
         </View>
         <View style={styles.Totals1}>
           <Text style={styles.TotTXT}>ტრანსპორტირება</Text>
           <Text style={styles.TotTXT}>{Total == null ? (null) : (financial2(Total.Shipping))}₾</Text>
         </View>
         <View style={styles.Totals1}>
           <Text style={styles.TotTXT}>შეფუთვის ღირებულება</Text>
           <Text style={styles.TotTXT}>{Total == null ? (null) : (financial2(Total.Pack))}₾</Text>
         </View>
         <View style={styles.Totals2}>
           <Text style={styles.TotTXT}>სულ ჯამი</Text>
           <Text style={styles.TotTXT}>{Total == null ? (null) : (financial2(Total.Total))}₾</Text>
         </View>
         </View>

         <View style={styles.BTNCHECK}>
           <TouchableOpacity style={styles.BuyBtn}
           onPress={async () => {
            if(USERLOGEDIN.isLogedin == true ){
              nav.navigate('Checkout')

        
            } else {
                Alert.alert('ყურადღება', 
                'ყიდვის გასაგრძელებლად გთხოვთ გაიაროთ ავტორიზაცია',
                [
                    {
                      text: "ავტორიზაცია",
                      onPress: () => nav.navigate('Login'),
                    },
                    {
                        text: "გაუქმება",
                        
                      },
                  ],
                  )
        
            }
          
            }}
           >
             <Text style={styles.TXTBTN}>განაგრძეთ ყიდვა</Text>
           </TouchableOpacity>
         </View>

          </React.Fragment>
         
         
         )}
       

       

      </SafeAreaView>
         </React.Fragment>

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
  width: '100%',
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
TotalsCont: {
  width: '90%',
  flexDirection: 'column',
  borderTopWidth: 1,
  borderTopColor:'#ed8d2d',
  paddingTop: 15,
},
Totals1: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
Totals2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 7,
  borderBottomWidth: 1,
  borderTopWidth: 1,
  borderBottomColor: '#ed8d2d',
  borderTopColor: '#ed8d2d',
  paddingBottom: 5,
  paddingTop: 5,
},
TotTXT: {
  fontWeight: 'bold',
  fontSize: 16,
  fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
},
MainCont: {
  minWidth: '100%', 
  alignItems: 'center',
  paddingBottom: 30,
  ...Platform.select({
      android: {
        paddingBottom: 80,
      }
    })
},
BTNCHECK: {
  width: '100%',
  marginBottom: 30,
  marginTop: 40,
},
BuyBtn: {
  width: '50%',
  height: 50,
  backgroundColor:  '#ed8d2d',
  borderRadius: 15,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
TXTBTN: {
  fontSize: 15,
  fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
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
