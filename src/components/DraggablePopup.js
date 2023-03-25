import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import Draggable from 'react-native-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { setLastOrder } from '../store/Orders/OrdersActionCreat';
import { selectLastOrder } from '../store/Orders/OrdersSelector';
import { API } from '../API/APIs';
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { selectLogedin } from '../store/User/userSelector';



// https://www.npmjs.com/package/react-native-draggable


export default function DraggablePopup() {
    const dispatch = useDispatch()
    const LASTORDER = useSelector(selectLastOrder)
    const [tok, setTok] = useState(null)
    const [Loading, setLoading] = useState(true)
    const nav = useNavigation()
    const USERLOGEDIN = useSelector(selectLogedin)




    const SetTOKENNN = async () => {
        const TOKEN = await AsyncStorage.getItem('TOKEN')
        .then((value) => setTok(value))
    }



    useEffect(() => {
    if (tok == null || tok == undefined) {
        SetTOKENNN()
    } else {
        null
    }

    }, [tok])


    useEffect(() => {
        fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ApiMethod: 'OrderHistory',
                    controller: 'Orders',
                    pars: {
                        OFFSET: '0',
                        ITEM_COUNT: '1',
                        TOKEN: tok,
                    },
                }),
            }).then(db =>{
                  db.json().then(json => {   
            
                  if(json.status === 'success' )
                  {   
                    dispatch(setLastOrder(json.data))
                    setLoading(false)
                  } 
                })             
              })
      }, [tok, Loading])  


      useEffect(() => {
      }, [LASTORDER])
      
      





  return (
      <React.Fragment>
          {USERLOGEDIN.isLogedin ? (
            <React.Fragment>
               {LASTORDER[0]  == undefined || LASTORDER[0]  == null ? (
                null
            ) : (
              LASTORDER[0].ORDER_POS == -1 || LASTORDER[0].ORDER_POS == 5 || LASTORDER[0].ORDER_POS == 6 ? (
                  null
              ) : (
                <View style={styles.DRAGDROP}>
                <Draggable 
                x={100} 
                y={20} 
                minY={10}     
                renderSize={76} 
                renderColor={LASTORDER[0].ORDER_POS == 0 ? '#F08282' : 'white'} 
                isCircle   
                onShortPressRelease={()=> nav.navigate('Orders')}>
                    <React.Fragment>
            
                    {Loading ? (
                        <Loader/>
                    ) : (LASTORDER.map((LASTORDER, idx) => (
                       
                        Number(LASTORDER.ORDER_POS) == -1 ? (    
                            <View style={styles.OrderProcess} key={idx}>
                            <Image source={require('../Photos/canceled.png')}
                          style={styles.OrdProIco} 
                          />
                            </View>
                            ) : (
                            Number(LASTORDER.ORDER_POS) == 0 ? (
                              <View style={styles.OrderProcess} key={idx}>
                              <Image source={require('../Photos/bankcard.png')}
                            style={styles.OrdProIco} 
                            />
                              </View>
                            ) : (
                              Number(LASTORDER.ORDER_POS) == 1 ? (
                                <View style={styles.OrderProcess} key={idx}>
                          <Image source={require('../Photos/packingp.png')}
                        style={styles.OrdProIco} 
                        />
                          </View>
                            ) : (
                              Number(LASTORDER.ORDER_POS) == 2 ? (
                                <View style={styles.OrderProcess} key={idx}>
                          <Image source={require('../Photos/packed.png')}
                        style={styles.OrdProIco} 
                        />
                          </View>
                            ) : (
                              Number(LASTORDER.ORDER_POS) == 3 ? (
                                <View style={styles.OrderProcess} key={idx}>
                          <Image source={require('../Photos/deliverip.png')}
                        style={styles.OrdProIco} 
                        />
                          </View>
                            ) : (
                              Number(LASTORDER.ORDER_POS) == 4 ? (
                                <View style={styles.OrderProcess} key={idx}>
                          <Image source={require('../Photos/delivering.png')}
                        style={styles.OrdProIco} 
                        />
                          </View>        
                            ) : (
                              Number(LASTORDER.ORDER_POS) == 5 ? (
                                <View style={styles.OrderProcess} key={idx}>
                                <Image source={require('../Photos/delivered.png')}
                              style={styles.OrdProIco} 
                              />
                                </View>
                            ) : (
                              Number(LASTORDER.ORDER_POS) == 6 ? (
                                <View style={styles.OrderProcess} key={idx}>
                                <Image source={require('../Photos/done1.png')}
                              style={styles.OrdProIco} 
                              />
                                </View>
                            ) : (null)
                            )  ) )  ) ) ) )   
                    ))
                                          
                        
            
                    )}
                            </React.Fragment>
            
                    
                </Draggable> 
                
                </View>
        
              )
                
            )}
            </React.Fragment>

          ) : (
            null
          ) }
       

      
            </React.Fragment>

   
  )
}



const styles = StyleSheet.create({
    DRAGDROP: {
        zIndex: 999999999999999,
    },
    OrdProIco: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        alignSelf: 'center',
      },
      OrderProcess: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
      },
    

})