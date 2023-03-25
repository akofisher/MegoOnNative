// import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
// import React, {useEffect, useState} from 'react'
// import FastImage from 'react-native-fast-image'
// import { RemoveFromCart, GetCartCount,ChangeCartItemCount, CartSumData, LoadCart  } from '../logic/CartLogic'
// import { useDispatch, useSelector } from 'react-redux'
// import { setCardCount } from '../store/Products/prodActCreat'
// import { setBeerLoad, setCartTotalLoad, setSpecsLoad } from '../store/User/userActCreat'
// import { selectLoadCartSum } from '../store/User/userSelector'
// import { selectCardCount } from '../store/Products/prodSelector'







// export default function CartQuantity({cart}) {
//   const [imageError, setImageError] = useState(true)
//   const [SinglprodCount, setSinglProdCount] = useState(Number(cart.PRODUCT_CART_COUNT))
//   const [rem, setRem] = useState(true)
//   let COUNTER = GetCartCount()
//   const dispatch = useDispatch()
//   const [load, setLoad] = useState(true)
//   let TOTALSUM = CartSumData()
//   const TotalLoad = useSelector(selectLoadCartSum)
//   const COUNTOFCART = useSelector(selectCardCount)
//   const [price, setPrice] = useState('')
//   const [weighAlert, setWeighAlert] = useState(0)
//   const [chng, setChng] = useState(true)



//   useEffect(() => {
//     if (weighAlert == 1) {
//         return Alert.alert('ყურადღება','ასაწონი პროდუქცია! გთხოვთ გაითვალისწინოთ მოცულობასთან შეფარდებული დაახლოებითი წონა! (მაგალითად საზამთრო საშუალოდ იწონის 10კგ) თქვენი მითითებული წონა დაკორექტირებული იქნება ავტომატურად. დიდი სხვაობის შემთხვევაში დაგიკავშირდებათ კონსულტანტი')
//     }
//   }, [weighAlert])


//   const HandPrice = async (val, cnt) => {
//     let totall;
//     totall = price / val 
//     setSinglProdCount(Number(totall))
//     await ChangeCartItemCount(cnt.UID, Number(totall))
//     await CartSumData()
//     await dispatch(setCartTotalLoad(true)) 

// }


//   useEffect(() => {
    
//   }, [TotalLoad])
  


//   function financial(x) {
//     return Number.parseFloat(x).toFixed(3);
//   }
  
//   function financial2(x) {
//   return Number.parseFloat(x).toFixed(2);
// } 

// useEffect(() => {
    
//   }, [TOTALSUM])

  
  

  

//   const increseQuantity = async () => {
//     if (SinglprodCount * 1 + Number(cart.STEP) <= Number(cart.PRODUCT_COUNT)) {
//       await ChangeCartItemCount(cart.UID, Number(cart.STEP));
//       setSinglProdCount(Number(SinglprodCount) + Number(cart.STEP));
//       await CartSumData()
      
      
//     }
    
//   }
  
//   const decreaseQuantity = async () => {
//     if (SinglprodCount * 1 - Number(cart.STEP) >= Number(cart.MINWEIGHT)) {
//      await ChangeCartItemCount(cart.UID, Number(cart.STEP*-1));
//       setSinglProdCount(Number(SinglprodCount) - Number(cart.STEP));
//      await CartSumData()
      
//     }
//   }
  
//   useEffect(() => {
//     if(SinglprodCount <= cart.MINWEIGHT) {
//       setSinglProdCount(Number(cart.MINWEIGHT))
//     }
    
//   }, [SinglprodCount])

  
  
  
  
//   const Remove = async (id) => {
//     await RemoveFromCart(id)
//     dispatch(setSpecsLoad(true))
//     dispatch(setBeerLoad(true))
//     if(rem == true) {
//       setRem(false)
//     } else {
      
//       setRem(false)
//     }
//   }
  
//   useEffect(() => {
//     GetCartCount()
//     dispatch(setCardCount(COUNTER))
    
    
//   }, [rem])
  


//   const onImageNotFound = () => {
//       setImageError(false);
//     }

//     function financial2(x) {
//       return Number.parseFloat(x).toFixed(2);
//       }



//     useEffect(() => {
//     }, [cart])



    
//   return (
      

//     <View style={styles.container} >
//       <TouchableOpacity
//       onPress={async () => {
//         await Remove(cart.UID)
//          dispatch(setCartTotalLoad(true))

//       }}
//       style={styles.cartDelete1}
//       >
//        <Image source={require('../Photos/cancel.png')}
//       style={styles.cartDelete} 
//       />
//       </TouchableOpacity>
//     <FastImage
//                     style={styles.CartIMG}
//                     source={
//                         imageError ?
//                           { uri: 'https://cdn.mego.ge/' + cart.DEF_IMAGE,
//                           headers: { Authorization: 'someAuthToken' },
//                           priority: FastImage.priority.normal, }
//                           : { uri: 'https://cdn.mego.ge/logoshare.jpg',
//                           headers: { Authorization: 'someAuthToken' },
//                           priority: FastImage.priority.normal, }
//                     }
//                     resizeMode={FastImage.resizeMode.stretch}
//                     onError={() => onImageNotFound()}
//                     />
//       <View style={styles.flexibleCont}>
//         <View>

//       <Text style={styles.txt} numberOfLines={1}>{cart.PRODUCT_NAME}</Text>
//         </View>
//         <View style={styles.quant}>
//         <View style={styles.CardCounter}>
//         {cart.COUNT_TYPE == 2 || cart.COUNT_TYPE_NAME == 'კგ' ? (
//           <View style={styles.weightConT}>
          
//           <View style={styles.CardCounter}>
//            <TouchableOpacity 
//         onPress={() => {
//           decreaseQuantity()
//           dispatch(setCartTotalLoad(true))        }}
//         style={styles.CountBtns}>
//             <Text style={styles.BtnTxts}>-</Text>
//         </TouchableOpacity>
//         <Text style={styles.CountTotal}>{financial(SinglprodCount)}კგ</Text>
//         <TouchableOpacity 
//         onPress={() => {
//           increseQuantity()
//           dispatch(setCartTotalLoad(true))          }}
//         style={styles.CountBtns}>
//             <Text style={styles.BtnTxts}>+</Text>

//         </TouchableOpacity>
//           </View>
//           <View style={styles.weigh}>
//           <TextInput
//         style={styles.inputPrice}
//         defaultValue={""}
//         onEndEditing={() => {
//             cart.SALE_PERCENT > 0 && cart.SALE_PRICE > 0 ? (
//                 HandPrice(cart.SALE_PRICE, cart)
//                 ) : (
//                     HandPrice(cart.PRODUCT_PRICE, cart)
//                     )
            
//         }}
//         onChangeText={val => setPrice(val)}
//         value={Number(price)}
//         keyboardType="numeric"
//         placeholderTextColor='black'
//         textAlign='center'
//         clearTextOnFocus={true}
//         placeholder={'ჩაწერეთ თანხა'}
//         onFocus={() => {
//             if(weighAlert == 0) {
//                 setWeighAlert(1)
//             } else {
//                 setWeighAlert(2)
//             }
//         }}
//         onBlur={() => {
//             setChng(false) 
//                 if(chng == false) {
//                 setChng(true)
//                 }

//         }}
//       />

//           {/* <Text style={styles.CountTotal}>{cart.SALE_PERCENT > 0 && cart.SALE_PRICE > 0 ? (
//             financial2(cart.SALE_PRICE * SinglprodCount )
//             ) : (
//               financial2(cart.PRODUCT_PRICE * SinglprodCount )
//               )
//             }₾</Text>  */}
//             </View>
//           </View>
       
//         ) : (
//          <React.Fragment>
//             <TouchableOpacity 
//         onPress={() => {
//           decreaseQuantity()
//           dispatch(setCartTotalLoad(true))        }}
//         style={styles.CountBtns}>
//             <Text style={styles.BtnTxts}>-</Text>
//         </TouchableOpacity>
//         <Text style={styles.CountTotal}>{SinglprodCount}</Text>
//         <TouchableOpacity 
//         onPress={() => {
//           increseQuantity()
//           dispatch(setCartTotalLoad(true))          }}
//         style={styles.CountBtns}>
//             <Text style={styles.BtnTxts}>+</Text>

//         </TouchableOpacity>
//          </React.Fragment>
//         ) }
       
//         </View>
//         </View>
//         <View style={styles.PricesCont}>
//          <View style={styles.PricesConts}>
//            <Text style={styles.txt2}>ერთეულის ფასი</Text>
//            <Text style={styles.txt3}>{financial2(cart.PRODUCT_PRICE)}₾</Text>

//          </View>
//          <View style={styles.PricesConts}>
//            <Text style={styles.txt2}>ჯამი</Text>
//            <Text style={styles.txt3}>{financial2(cart.PRODUCT_PRICE * SinglprodCount)}₾</Text>

//          </View>
//         </View>

//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//       width: '90%',
//       minHeight: 140,
//       maxHeight: 160,
//       backgroundColor: 'white',
//       marginBottom: 20,
//       borderRadius: 15,
//       padding: 5,
//       flexDirection: 'row',
//       position: 'relative',
//       // ...Platform.select({
//       //   android: {
//       //     height: 140,
//       //   }
//       // })
//   },
//   CardCounter: {
//     flexDirection: 'row',
//     justifyContent: 'center'
// },
// CountBtns: {
//     width: 24,
//     height: 24,
//     backgroundColor: '#ed8d2d',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5, 
// },
// BtnTxts: {
//     fontSize: 18,
//     fontFamily: 'Verdana', 
//       ...Platform.select({
//        android: {
//          fontFamily: 'Roboto', 
//        }
//      })
// },
// CountTotal: {
//     alignSelf: 'center',
//     marginLeft: 10,
//     marginRight: 10,
//     fontFamily: 'Verdana', 
//       ...Platform.select({
//        android: {
//          fontFamily: 'Roboto', 
//        }
//      })
// },
//   txt: {
//      width: 200,
//      fontSize: 13,
//      textAlign: 'center',
//      fontFamily: 'Verdana', 
//       ...Platform.select({
//        android: {
//          fontFamily: 'Roboto', 
//        }
//      })
//     },
//   CartIMG: {
//     width: '30%',
//     height: '80%',
//     alignSelf: 'center',
   
//   },
//   flexibleCont: {
//     width: '65%',
//     padding: 10,
//     alignItems: 'center',
//   },
//   quant: {
//     width: '100%',
//     alignSelf: 'center',
//     padding: 15,
//   },
//   PricesCont: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   txt2: {
//     fontSize: 9,
//     textAlign: 'center',
//     paddingTop: 2,
//     fontFamily: 'Verdana', 
//       ...Platform.select({
//        android: {
//          fontFamily: 'Roboto', 
//        }
//      })
//   },
//   txt3: {
//     fontSize: 9,
//     textAlign: 'center',
//     paddingTop: 2,
//     fontWeight: 'bold',
//     fontFamily: 'Verdana', 
//     color: 'black',
//       ...Platform.select({
//        android: {
//          fontFamily: 'Roboto', 
//        }
//      })
//   },
//   PricesConts: {
//     width: '45%',
//     height: 40,
//     backgroundColor: '#ed8d2d',
//     padding: 3,
//     borderRadius: 15,
//     ...Platform.select({
//       android: {
//         width: '45%',
//         marginRight: 10,
//       }
//     })
//   },
//   cartDelete: {
//     width: 35,
//     height: 35,
//     resizeMode: 'contain',
//     tintColor: '#ed8d2d',
    

//   },
//   cartDelete1: {
//     width: 35,
//     height: 35,
//     position: 'absolute',
//     right: -10,
//     top: -10,

//   },
//   CountTotal: {
//     alignSelf: 'center',
//     marginLeft: 10,
//     marginRight: 10,
//     fontFamily: 'Verdana', 
//     color: 'black',
//       ...Platform.select({
//        android: {
//          fontFamily: 'Roboto', 
//        }
//      })
//     },
//     weightConT: {
//       flexDirection: 'row',
//       // justifyContent: 'center',
//       alignItems: 'center',
//     },
//     weigh: {
//       backgroundColor: '#ed8d2d',
//       padding: 2,
//       borderRadius: 10,
//       marginLeft: 15,
//     },
//     inputPrice: {
//       fontSize: 10,
//       padding: 0,
//   }
    

//   })