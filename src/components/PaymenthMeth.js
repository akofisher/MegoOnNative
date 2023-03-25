import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectPayment } from '../store/Checkout/CheckoutSelector';
import { setPayment } from '../store/Checkout/CheckoutActionCreat';
import CheckBox from '@react-native-community/checkbox'



export default function PaymenthMeth() {
  const [online, setOnline] = useState(false);
  const [cash, setCash] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [cash1, setCash1] = useState(false);
  const [cash2, setCash2] = useState(false);
  const [money, setMoney] = useState('');
  const dispatch = useDispatch()
  const paymentMeth = useSelector(selectPayment)





  const cashFunc = () => {
    if(cash == true && cash2 == true && money.length > 0 ){       
       dispatch(setPayment({
         Payment: '2',
         Cash: money,
         Checked: true,
       }))       
     }
 }
 const CheckedorNo = () => {
    if(cash != true && online != true && terminal != true ){       
       dispatch(setPayment({
         Checked: false,
       }))       
     }
 }

 useEffect(() => {
   if(online == true){
   dispatch(setPayment({
     Payment: '1',
     Checked: true,
   }))
   }    
   CheckedorNo()
 }, [online])
 

 useEffect(() => {
 if(cash == true && cash1 == true){    
     dispatch(setPayment({
     Payment: '2',
     Cash: 'Exactly',
     Checked: true,
   }))    
   }
 }, [cash1]) 

 useEffect(() => {
   cashFunc()
   CheckedorNo()
 }, [cash])

 useEffect(() => {
   cashFunc()
 }, [cash2])

  useEffect(() => {
   cashFunc()
 }, [money]) 
 


 useEffect(() => {
 if(terminal == true){
     dispatch(setPayment({
     Payment: '3',
     Checked: true,
   }))
   }
   CheckedorNo()
 }, [terminal])

 useEffect(() => {
 }, [paymentMeth])






 const Methods = [
  {
    img: require('../Photos/card.png'),
    text: 'ონლაინ გადახდა',
    id: 0,
   },
   {
    img: require('../Photos/money.png'),
    text: 'ქეშით გადახდა კურიერთან',
    id: 1,
   },
   {
    img: require('../Photos/ter.png'),
    text: 'ბარათით გადახდა კურიერთან',
    id: 2,
  },
  ];


    
   const CHOOSE = (meth) => {
    if(meth.id == 0){
      if(online == false) {
          setOnline(true)
          setCash(false)
          setTerminal(false)
         } else if (online == true) {
          setOnline(false)         
         }
        } else if (meth.id == 1) {
          if(cash == false) {
          setCash(true)
          setOnline(false)
          setTerminal(false)
         }else if (cash == true) {
          setCash(false)          
         }
        } else if (meth.id == 2) {
          if(terminal == false) {
          setTerminal(true)
          setCash(false)
          setOnline(false)
         }else if (terminal == true) {
          setTerminal(false)         
         }
        }
    }




  return (
    <React.Fragment>
    {Methods.map((meth) => {
      return (

        <TouchableOpacity
        style={styles.PaymenthCard}
        onPress={() => {
          if(meth.id == 1 && cash == true) {

          } else {
           CHOOSE(meth) }
        }}
        key={meth.id}>
          <CheckBox
                    disabled={false}
                    value={meth.id == 0 ? (online) : (null) || meth.id == 1 ? (cash) : (null) || meth.id == 2 ? (terminal) : (null)}
                     style={styles.PayCheck}
                    />
        <Image source={meth.img}
        style={styles.PayImg} 
        />
        {meth.id == 1 ? (
       cash == true ? 
       ( 
         <React.Fragment>
           <TouchableOpacity
           style={styles.CashContt}
           onPress={() => {
            if(cash1 == false){
              setCash1(true)
              setCash2(false)
              setMoney('')
            } else{
              setCash1(false)
            }
            
          }}
          >
             <CheckBox
                    disabled={false}
                    value={cash1}
                    style={styles.PayCheck1}
                    checked={cash1}
                    onPress={() => {
                      if(cash1 == false){
                        setCash1(true)
                        setCash2(false)
                        setMoney('')
                      } else{
                        setCash1(false)
                      }
                      
                    }}
                    />
             <Text style={styles.PayTxt}>ზუსტად მაქვს</Text>

           </TouchableOpacity>

           <TouchableOpacity
           style={styles.CashContt}
           onPress={() => {
             if(cash2 == false){
               setCash2(true)
               setCash1(false)
              } else{
                setCash2(false)
                setMoney('')
            }
          }}
          >
            <CheckBox
                    disabled={false}
                    value={cash2}
                    checked={cash2}
                     style={styles.PayCheck1}
                     onPress={() => {
                      if(cash2 == false){
                        setCash2(true)
                        setCash1(false)
                       } else{
                         setCash2(false)
                         setMoney('')
                     }
                   }}
                    />
            <TextInput 
            placeholderTextColor="#A0A0A0"
            placeholder='ჩაწერე თანხა'
            style={styles.CashMoney}
            defaultValue={''}
            onChangeText={(val) => setMoney(val)}
            value={money}
            onFocus={() => {
              if(cash2 == false){
                setCash2(true)
                setCash1(false)
               } else{
                 setCash2(false)
                 setMoney('')
             }
              
            }}
            ></TextInput>

           </TouchableOpacity>

           

         </React.Fragment> 
         ) : (

           <Text style={styles.PayTxt}>{`${meth.text}`}</Text>
         )) : (

           <Text style={styles.PayTxt}>{`${meth.text}`}</Text>
           )}
        </TouchableOpacity>
      )
    })}
      </React.Fragment>
  )
}


const styles = StyleSheet.create({
  PayImg: {
    
    alignSelf: 'center',
    resizeMode: 'cover',
    marginBottom: 10,

  },
  PaymenthCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '42%',
    height: 180,
    marginLeft: 20,
    marginTop: 20,
    padding: 5,
  },
  PayCheck: {
    alignSelf: 'flex-end',
  },
  PayTxt: {
    alignSelf: 'center',
    fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
  },
  CashContt: {
    width: '95%',
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    zIndex: 9999999,
    ...Platform.select({
      android: {
        marginBottom:5,
      }
    })
  },
  PayCheck1: {
    marginRight: 7,

  },
  CashMoney: {
    ...Platform.select({
      android: {
        paddingRight:5,
        paddingTop:5,
        paddingBottom:5,
      }
    })
  }
  
  


})