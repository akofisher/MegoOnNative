import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeAddress } from '../store/Address/AddressActCreat'
import { API } from '../API/APIs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setAddressLoad } from '../store/User/userActCreat'
import { setAddressMod } from '../store/Address/AddressActCreat'
import { useNavigation } from '@react-navigation/native'









export default function AddressCard({cart}) {
   const dispatch = useDispatch()
   const [token, setToken] = useState(null)
   const nav = useNavigation()


 
  


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



    useEffect(() => {
      
    }, [token])

    const DELETEADDRESS = (item) => {
        fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ApiMethod: 'RemoveAddress',
                        controller: 'Address',
                        pars: {
                            UID: item,
                            TOKEN: token,
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


      const CHANGEDEFADDRESS = (item) => {
        fetch(API, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ApiMethod: 'ChangeDefAddress',
                          controller: 'Address',
                          pars: {
                              UID: item,
                              TOKEN: token,
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
        await DELETEADDRESS(cart.UID)
        await dispatch(removeAddress(cart.UID))

      }}
      style={styles.cartDelete1}
      >
       <Image source={require('../Photos/cancel.png')}
      style={styles.cartDelete} 
      />
      </TouchableOpacity>
      <View style={styles.flexibleCont}>
        <View>

      <Text style={styles.TXT}>{cart.ADDRESS}</Text>
      <Text style={styles.TXT1}>{cart.CONTACT_PHONE} - {cart.FIRST_NAME}</Text>
        </View>
        <View style={styles.flexi}>
            {cart.IS_DEFAULT == 1 ? (
                 <TouchableOpacity style={styles.DefAddrBTN}>
                 <Text style={styles.UnivText}>ძირითადი მისამართი</Text>
                 </TouchableOpacity>

            ) : (
                <TouchableOpacity
                onPress={async () => {
                   await CHANGEDEFADDRESS(cart.UID)
                   await dispatch(setAddressLoad(true))

                }
                }
                style={styles.AddDefBTN}>
                <Text style={styles.UnivText}>ძირითადად დაყენება</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.RedactBTN}
            onPress={async () => {
             await dispatch(setAddressMod({
                editable: true,
                item: cart,
                open: true,
              }))
             await nav.navigate('AddAddress')
            }}
            >
                <Text style={styles.UnivText}>რედაქტირება</Text>
            </TouchableOpacity>

        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '90%',
      minHeight: 120,
      maxHeight: 180,
      backgroundColor: 'white',
      marginBottom: 20,
      borderRadius: 15,
      padding: 5,
      flexDirection: 'row',
      position: 'relative',
      ...Platform.select({
        android: {
          height: 130,
          marginTop: 10,
        }
      })
    },
    flexibleCont: {
        width: '95%',
        padding: 5,
        alignItems: 'flex-start',
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
    TXT: {
        paddingTop: 2,
        fontSize: 12,
        fontFamily: 'Verdana', 
        color: 'black',
      ...Platform.select({
       android: {
         fontFamily: 'Roboto', 
       }
     })
       
    },
    TXT1: {
        paddingTop: 8,
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Verdana', 
        color: 'black',
      ...Platform.select({
       android: {
         fontFamily: 'Roboto', 
       }
     })
        
    },
    flexi: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 15,
    },
    DefAddrBTN: {
      width: '42%',
        height: 40,
        backgroundColor: 'green',
        padding: 4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddDefBTN: {
      width: '42%',
        height: 40,
        backgroundColor: '#ed8d2d',
        padding: 4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RedactBTN: {
      width: '42%',
        height: 40,
        backgroundColor: '#ed8d2d',
        padding: 4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    UnivText: {
      fontSize: 10,
      fontFamily: 'Verdana', 
      color: 'black',
      ...Platform.select({
       android: {
         fontFamily: 'Roboto', 
       }
     })
    },
    

  })