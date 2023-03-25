import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { API } from '../API/APIs'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleProd } from '../store/Products/prodActCreat'
import { selectSingleProd } from '../store/Products/prodSelector'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Loader from '../components/Loader'
import CardCounter from '../components/CardCounter'
import SameProds from '../components/SameProds'
import Barcode from '@kichiyaki/react-native-barcode-generator';
import Clipboard from '@react-native-clipboard/clipboard';
import ThirdHeader from '../components/ThirdHeader'
import DraggablePopup from '../components/DraggablePopup'


export default function SingleProdScreen(props) {
    const SinglProd = useSelector(selectSingleProd)
    const dispatch = useDispatch()
    const nav = useNavigation()
    const [imageErrorS, setImageErrorS] = useState(true)
    const [isLoadingS, setIsLoadingS] = useState(false)
    const [copied, setCopied] = useState(false)


    
     

    const onImageNotFoundS = () => {
        setImageErrorS(false);
      }
    
    
    useEffect(() => {
      if(copied == true) {
          setTimeout(() => {
              setCopied(false)
          }, 1000);
      }
      
    }, [copied])
    
    
    useEffect(() => 
    {   
        setIsLoadingS(true)
    fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ApiMethod: 'GetProductInfo',
                controller: 'Product',
                pars: {
                    PRODUCT_ID:  props.route.params.uidd,
                },
            }),
        }).then(db =>{
               db.json().then(json => {            
              if(json.status === 'success' )
              {    
              
               dispatch(setSingleProd(json.data))
                   
               setTimeout(() => {
                   
                   setIsLoadingS(false)
               }, 500);   
               if(imageErrorS == false) {
                   setImageErrorS(true)
               }    
              } 
            })             
          })
          
  }, [props])


  return (
      <SafeAreaView style={styles.SingContainer}>
          <ThirdHeader/>
          <DraggablePopup/>
          <TouchableOpacity
            onPress={() =>  nav.goBack()}
            style={styles.GoBack}>
            <Image source={require('../Photos/goback.png')}
      style={styles.GobackIcon} 
      />
      <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>
                
            </TouchableOpacity>
          {isLoadingS ? (
              <View style={styles.LoaderS}>

                  <Loader/>
              </View>
          ) : (
              <ScrollView style={styles.SameProdScroll}>


        <View style={styles.ProdCont}>
            <View style={styles.ImgCont}>
  
        <FastImage
              style={styles.CardIMG}
              source={
                  imageErrorS  ?
                  { uri: 'https://cdn.mego.ge/' + SinglProd.DEF_IMAGE,
                  headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal, }
                  : { uri: 'https://cdn.mego.ge/logoshare.jpg',
                  headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal, }
                }
                resizeMode={FastImage.resizeMode.stretch}
                onError={(prop) => onImageNotFoundS()}
              />          
              </View>
            <Text style={styles.SinglTxt}>{SinglProd.PRODUCT_NAME}</Text>
            {SinglProd.DESCRIPTION ? (
                <React.Fragment>
                <Text style={styles.SinglTxt3}>აღწერა</Text>
                <View style={styles.SinglTxtCont}>
                <Text style={styles.SinglTxt}>{SinglProd.DESCRIPTION}</Text>
                </View>
                </React.Fragment>
            ) : (null)}
            {SinglProd.BARCODE ? (
                <TouchableOpacity style={styles.BarcodeCont}
                onPress={() => {
                    Clipboard.setString(SinglProd.BARCODE)
                    setCopied(true)
                }
                }
                >
                <Barcode
                    format="CODE128B"
                    value={SinglProd.BARCODE}
                    text={SinglProd.BARCODE}
                    style={styles.Barcoder}
                    maxWidth={Dimensions.get('window').width / 2}
                    
                />
                {copied ? (
                    <Text style={styles.copiedTXT}>კოპირებულია !</Text>
                ) : (null)}
                </TouchableOpacity>
            ) : (null)}
            
            
            <View  style={styles.flexibleRow}>
                    
                    <CardCounter data={SinglProd}/>
                   
            </View>
         
        </View>
        <View style={styles.SameProdCont}>
           <SameProds data={SinglProd.CATEGORY_ID}/>
        </View>
            </ScrollView>
          )}
         
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    SingContainer: {
        backgroundColor: '#fcd895',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        zIndex: 2,

    },
    ProdCont: {
        marginTop: 10,
    },
    SameProdCont: {
        width: '100%',
    },
    CardIMG: {
        width: '100%',
        height: 160,
        borderRadius: 20,
    },
    SinglTxt: {
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Verdana',
       color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    },
    SinglTxt3: {
        textAlign: 'center',
        padding: 10,
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
    SinglTxtCont: {
        borderBottomColor: 'white',
        borderTopColor: 'white',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        width: '80%',
        alignSelf: 'center',
        marginTop: 15,
        fontFamily: 'Verdana',
        color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    },
    ImgCont: {
        width: '70%',
        height: 160,
        alignSelf: 'center',
    },
    SinglBack: {
        fontSize: 16,
        padding: 20,
        fontWeight: 'bold',
        fontFamily: 'Verdana',
        color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    },
    LoaderS: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexibleRow: {
        width: '65%',
        alignSelf: 'center',
        ...Platform.select({
            android: {
              paddingTop: 20,
            }
          })
    },
    CardIcons1: {
        width: 45,
        height: 45,
        resizeMode: 'stretch',
    },
    CardIcons2: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
    },
    BarcodeCont: {
       width: '70%',
       height: 140,
       alignSelf: 'center',
       marginTop: 20,
    },
   
    copiedTXT: {
        backgroundColor: 'green',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
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