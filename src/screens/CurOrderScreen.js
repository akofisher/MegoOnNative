import {  StyleSheet, SafeAreaView,  ScrollView, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
// import { useNavigation } from '@react-navigation/native'
import SetHeader from '../components/SetHeader'
// import { API } from '../API/APIs' 
// import { useDispatch, useSelector } from 'react-redux'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { selectLoadCartSum } from '../store/User/userSelector'
// import {  setLoadCartSum } from '../store/User/userActCreat'
import Loader from '../components/Loader'
// import {selectOrders} from '../store/Orders/OrdersSelector'
// import {setOrders} from '../store/Orders/OrdersActionCreat'
// import OrdersCard from '../components/OrdersCard'
// import { selectCheckLoad } from '../store/Checkout/CheckoutSelector'
// import { setCheckouLoad } from '../store/Checkout/CheckoutActionCreat'


export default function CurOrderScreen() {
//   const nav = useNavigation()
//   const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
//   const USERORDERS = useSelector(selectOrders)
//   const [token, setToken] = useState(null)
//   const TotLoad = useSelector(selectLoadCartSum)
//   const CheckLoad = useSelector(selectCheckLoad)


//   useEffect(() => {
    
//   }, [loading])


  
  


//   const SetTOKENNN = async () => {
//     const TOKEN = await AsyncStorage.getItem('TOKEN')
//     .then((value) => setToken(value))
// }



// useEffect(() => {
//   if (token == null || token == undefined) {
//       SetTOKENNN()
//   } else {
//       null
//   }

// }, [token])

// useEffect(() => {
//   if(TotLoad == true) {
//     setTimeout(() => {
//       dispatch(setLoadCartSum(false))
//      }, 100);
//    }
   
//  }, [TotLoad])

// useEffect(() => {
//   if(CheckLoad == true) {
//     setTimeout(() => {
//       dispatch(setCheckouLoad(false))
//      }, 150);
//    }
   
//  }, [CheckLoad])







// useEffect(() => {
//   fetch(API, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             ApiMethod: 'OrderHistory',
//               controller: 'Orders',
//               pars: {
//                   OFFSET: '0',
//                   ITEM_COUNT: '5',
//                   TOKEN: token,
//               },
//           }),
//       }).then(db =>{
//             db.json().then(json => {   
      
//             if(json.status === 'success' )
//             {   
//               dispatch(setOrders(json.data))
//               setLoading(false)
//             } 
//           })             
//         })
// }, [token, CheckLoad])  





  






  return (
    <SafeAreaView style={styles.Container}>
      <SetHeader/>
      {loading == false ? (
        <Loader/>
      ) : (
        <React.Fragment>
        
        <Text>Curren Order Screen</Text>

        </React.Fragment>
        
      )}
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    Container: {
      backgroundColor: '#fcd895',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
    },
    SecCont: {
      minWidth: '100%',
      marginTop: 40,
      alignItems: 'center',
      paddingBottom: 70,
    }
   
})