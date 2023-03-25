import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, TextInput, Linking} from 'react-native'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { selectCardCount } from '../store/Products/prodSelector'
import { useNavigation } from '@react-navigation/native'
import { selectAdrLoad, selectCartTotalLoad } from '../store/User/userSelector'
import { setAddressLoad, setCartTotalLoad } from '../store/User/userActCreat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {  CartSumData, LoadCart } from '../logic/CartLogic'
import FastImage from 'react-native-fast-image'
import CheckoutCards from '../components/CheckoutCards'
import { selectAddress, selectDefAddress, selectSelfTaking } from '../store/Address/AddressSelector'
import { setAddress, setDefAddress, setSelfTaking } from '../store/Address/AddressActCreat'
import { API } from '../API/APIs'
import AddressCard from '../components/AddressCard'
import PaymenthMeth from '../components/PaymenthMeth'
import CheckBox from '@react-native-community/checkbox'
import { selectCheckLoad, selectPayment } from '../store/Checkout/CheckoutSelector'
import { setCheckouLoad } from '../store/Checkout/CheckoutActionCreat'



export default function CheckoutScreen() {
  const [load, setLoad] = useState(true)
  const CARTDATA = LoadCart()
  const dispatch = useDispatch()
  const count = useSelector(selectCardCount)
  const nav = useNavigation()
  const TOTALSUM = CartSumData()
  const SumLoad = useSelector(selectCartTotalLoad)
  const CARDCOUNT = useSelector(selectCardCount)
  const ADDRESSDATA = useSelector(selectAddress)
  const ADRLOAD = useSelector(selectAdrLoad)
  const [token, setToken] = useState(null)
  const [userCrtData, setUserCrtData] = useState(null)
  const [message, setMessage] = useState('')
  const SELForNo = useSelector(selectSelfTaking)
  const PAYMENT = useSelector(selectPayment)
  const ADDRESS = useSelector(selectDefAddress)
  const CheckLoad = useSelector(selectCheckLoad)
  const [self, setSelf] = useState(0)
  const [mySelf, setMySelf] = useState(false)

  useEffect(() => {
    if(mySelf == true) {
      setSelf(1)
    } else if (mySelf == false) {
      setSelf(0)
    } else {
      (null)
    }
  }, [mySelf])
  


  useEffect(() => {
    if(self == 1) {
      
    dispatch(setSelfTaking({self: 1}))
    
   }else if (self == 0) {
     dispatch(setSelfTaking({self: 0}))    
   }
   console.log(self, 'SELFORNOT')
 }, [self])

 useEffect(() => {
 }, [PAYMENT])
 



  useEffect(() => {
    
  }, [message])

  useEffect(() => {
  }, [SELForNo])


  useEffect(() => {
  }, [TOTALSUM])


  const removeUserCart = async () => {
     await AsyncStorage.removeItem('UserCart')
  }
  
  
  



//   ADRESSS


useEffect(() => {
    
    if(ADRLOAD == true) {
      setTimeout(() => {
        dispatch(setAddressLoad(false))
       }, 100);
     }
     
   }, [ADRLOAD])


   const SetUserCartData = async () => {
    const DATA = await AsyncStorage.getItem('UserCart')
    .then((value) => setUserCrtData(value))
}



useEffect(() => {
  if (userCrtData == null || userCrtData == undefined) {
    SetUserCartData()
  } else {
      null
  }

}, [userCrtData])


 
  


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
    
}, [ADDRESSDATA])



  useEffect(() => {
    fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ApiMethod: 'AddressList',
              controller: 'Address',            
              pars: {
                TOKEN: token,
              },
            }),
        }).then(db =>{
              db.json().then(json => {            
              if(json.status === 'success' )
              {    

                dispatch(setAddress(json.data))
                {json.data.map((adr) => {
                if(adr.IS_DEFAULT == 1) {
                  dispatch(setDefAddress({DefUID: adr.UID}))
                }
                })}
                

              } 
            })             
          })
  }, [token, ADRLOAD])




//   ADRESSS


 useEffect(() => {
   
 }, [CARDCOUNT])
 

  function financial2(x) {
    return Number.parseFloat(x).toFixed(2);
  } 


  useEffect(() => { 
    if(CARTDATA != null || CARTDATA != undefined) {    
      setLoad(false);   
    } 
   }, [CARTDATA]) 

   
   


    useEffect(() => {
      if(SumLoad == true) {
        setTimeout(() => {
          dispatch(setCartTotalLoad(false))
         }, 100);
       }
       
     }, [SumLoad])


    useEffect(() => {
      if(CheckLoad == true) {
        setTimeout(() => {
          dispatch(setCheckouLoad(false))
         }, 100);
       }
       
     }, [CheckLoad])
    
    
    useEffect(() => {
      
 
    }, [count])

    const LastSubmit = () => {
      if(PAYMENT.Checked === true ) {
        fetch(API, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    ApiMethod: 'finalCart',
                    controller: 'Cart',
                    pars: {
                        addressId: ADDRESS.DefUID,
                        payType: PAYMENT.Payment,
                        moneyHand: PAYMENT.Payment == '2' ? (PAYMENT.Cash == 'Exactly' ? 
                        (TOTALSUM.Total) : (PAYMENT.Cash)) : (TOTALSUM.Total),
                        pickup: SELForNo.self,
                        messageToSeller: message || '',
                        packPrice: TOTALSUM.Pack,
                        asGift: 0,
                        TOKEN: token,
                        usercart: userCrtData,
                        shipping: TOTALSUM.Shipping,
                        // ORDER_NOW: orderNow,
                        // ORDER_DATE: orderDate
                  },
              }),
          }).then(db =>{
                 db.json().then(async json => {            
                if(json.status == 'success' )
                {   
                  if(PAYMENT.Payment == 1) {
                    await removeUserCart()
                    await dispatch(setCartTotalLoad(true))
                    await dispatch(setCheckouLoad(true))
                    Linking.openURL(json.data)
                    await nav.navigate('Orders')
                    // aq aris gasaketebeli brauzerze gadasvla monichebuli linkit
                    // window.location.replace(json.data)
                  } else {
                    await removeUserCart()
                    await dispatch(setCartTotalLoad(true))
                    await dispatch(setCheckouLoad(true))
                    await nav.navigate('Orders')
                  }       
                } 
              })             
            })
          } else {
            Alert.alert('ყურადღება','გთხოვთ აირჩიოთ გადახდის საშუალება !')
          }
  
    } 
  




  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.HeadCont}>
        <FastImage
            style={styles.HeadImg}
            source={{
                uri: 'https://cdn.mego.ge/img/logo.png',
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            />

        </View>
        <View style={styles.HeadCont}>
        <TouchableOpacity
                                onPress={() =>  nav.goBack()}
                                style={styles.GoBack}>
                                <Image source={require('../Photos/goback.png')}
                        style={styles.GobackIcon} 
                        />
                        <Text style={styles.CartGoBack}>კალათაში დაბრუნება</Text>
                                    
                    </TouchableOpacity>
        </View>
      
      <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.MainCont}>

{/* ForNow */}
        <View style={styles.ProdConte}>
            <View style={styles.ProdConteHead}>
                <Text style={styles.ProdsConteTxt}>პროდუქცია</Text>
                <Text style={styles.ProdsConteTxt}>სულ({CARDCOUNT})</Text>
            </View>
            <View style={styles.Prods}>
            {load ? (
            <Loader/>
            ) : (
              CARTDATA == null || CARTDATA == undefined ?  (
                null) : (
                  Array.from(CARTDATA.values()).map((card, i) =>
                  {
                    
                    return(
                      <CheckoutCards cart={card} key={card.UID}/>
                      
                      )
                    }
                    )
                    )
                    )}
            </View>
        </View>

        <View style={styles.PaymentConte}>
        <View>
            <Text style={styles.ProdsConteTxt}>აირჩიეთ გადახდის საშუალება</Text>
        </View>
        <View style={styles.Paymenths}>
            <PaymenthMeth/>
        </View>
        </View>

        <View style={styles.AddressConte}>
        <View style={styles.flexible}>
        <View >
         <Text style={styles.setHeadTXT}>აირჩიეთ მისამართი ან დაამატეთ</Text>
        </View>
      <TouchableOpacity
      onPress={() => nav.navigate('AddAddress')}
      >
      <Image source={require('../Photos/add.png')}
    style={styles.addIcon} 
    />
      </TouchableOpacity>
      </View>
      <TouchableOpacity
      onPress={() => {
        if(mySelf == false) {
          setMySelf(true)
        } else if(mySelf == true) {
          setMySelf(false)
        }
      }}
      style={styles.SelfTakinG}>
      <CheckBox
      disabled={false}
      value={mySelf}
      style={styles.SignupCheck}
      />
      <Text style={styles.UnivText}>თავად წავიღებ</Text>
      </TouchableOpacity>
      
        {!! ADDRESSDATA > 0 ? (
          ADDRESSDATA.map((val, idx) => {
            return (
              <AddressCard  key={idx} cart={val}/>
              )
            })
            ) : (null)}

        </View>

        <View style={styles.MessageForDelivery}>
            <Text style={styles.ProdsConteTxt}>შეტყობინება გამყიდველს</Text>
            <View style={styles.MessageArea}>

        <TextInput
        placeholderTextColor="#A0A0A0"
        multiline={true}
        numberOfLines={2}
        onChangeText={(val) => setMessage(val)}
        placeholder="შეიყვანეთ ტექსტი"
        value={message}
        style={styles.UnivText}
        
        />
        </View>
        </View>
     
{/* ForNow */}

         <View style={styles.TotalsCont}>

         <View style={styles.Totals1}>
           <Text style={styles.TotTXT}>პროდუქტები</Text>
           <Text style={styles.TotTXT}>{TOTALSUM == null ? (null) : (financial2(TOTALSUM.CartSum))}₾</Text>
         </View>
         <View style={styles.Totals1}>
           <Text style={styles.TotTXT}>ტრანსპორტირება</Text>
           <Text style={styles.TotTXT}>{TOTALSUM == null ? (null) : (financial2(TOTALSUM.Shipping))}₾</Text>
         </View>
         <View style={styles.Totals1}>
           <Text style={styles.TotTXT}>შეფუთვის ღირებულება</Text>
           <Text style={styles.TotTXT}>{TOTALSUM == null ? (null) : (financial2(TOTALSUM.Pack))}₾</Text>
         </View>
         <View style={styles.Totals2}>
           <Text style={styles.TotTXT}>სულ ჯამი</Text>
           <Text style={styles.TotTXT}>{TOTALSUM == null ? (null) : (financial2(TOTALSUM.Total))}₾</Text>
         </View>
         </View>
         



        <View style={styles.flexible2}>

         <View style={styles.BTNCHECK}>
           <TouchableOpacity style={styles.BuyBtn}
           onPress={async () => {
             if(PAYMENT.Payment == 2 && PAYMENT.Cash !== 'Exactly' && PAYMENT.Cash < TOTALSUM.Total) {
              Alert.alert('ყურადღება','კუპიურა უნდა აღემატებოდეს შეკვეთის ღირებულებას')
             } else {

               await dispatch(setCheckouLoad(true))
   
               await LastSubmit()}}
             }
           >
             <Text style={styles.TXTBTN}>ყიდვა</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.BTNCHECK}>
           <TouchableOpacity style={styles.CancBtn}
           onPress={() => nav.goBack()}
           >
             <Text style={styles.TXTBTN}>გაუქმება</Text>
           </TouchableOpacity>
         </View>
             </View>
         
         

      
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
},
TotalsCont: {
  width: '90%',
  flexDirection: 'column',
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
HeadCont: {
    height: 50,
    width: '100%',
    marginBottom: 5,
},
HeadImg: {
    width: '40%', 
    height: 50, 
    resizeMode: 'contain',
    alignSelf: 'center',
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
  ProdConte: {
      width: '90%',
  },
  ProdConteHead: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ed8d2d',
      paddingBottom: 10,
      borderTopWidth: 1,
      borderTopColor: '#ed8d2d',
      paddingTop: 10,
  },
  ProdsConteTxt: {
      fontSize: 16,
      fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
  },
  Prods: {
      marginTop: 15,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ed8d2d',
      paddingBottom: 10,
  },
  PaymentConte:{
    width: '90%',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ed8d2d',
    paddingBottom: 10,
    alignItems: 'center',
  },
  AddressConte:{
      width: '90%',
      alignItems: 'center',
      marginBottom: 15,
  },
  setHeadTXT: {
    fontSize: 14,
    fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    
  },
  addIcon: {
    tintColor: '#ed8d2d',
    width: 32,
    height: 32,
  },
  flexible: {
    width: '100%',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 15,
   
  },
  MessageForDelivery: {
    width: '90%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ed8d2d',
    paddingBottom: 10,
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#ed8d2d',
    paddingTop: 15,
  },
  MessageArea: {
      width: '90%',
      height: 90,
      backgroundColor: 'white',
      marginTop: 15,
      marginBottom: 15,
      borderRadius: 15,
      padding: 10,
      ...Platform.select({
        android: {
          padding: 0,
        }
      })
  },
  Paymenths: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    
  },
  SelfTakinG: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
 },
 SignupCheck: {
     marginRight: 40,
     width: 6,
 },
 BTNCHECK: {
  margin: 20,
},
BuyBtn: {
  width: 110,
  height: 50,
  backgroundColor:  '#ed8d2d',
  borderRadius: 15,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
CancBtn: {
  width: 110,
  height: 50,
  backgroundColor:  'lightgray',
  borderRadius: 15,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
TXTBTN: {
  fontSize: 16,
  fontWeight: 'bold',
  fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
},
flexible2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
UnivText: {
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
