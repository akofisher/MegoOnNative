import React, {useState, useEffect} from 'react';
import {View, Platform,  SafeAreaView, ScrollView, Text, StyleSheet, Button, TextInput, Alert, Image,TouchableOpacity} from 'react-native'
import {API} from '../API/APIs'
import CheckBox from '@react-native-community/checkbox'
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as yup from 'yup'
import FastImage from 'react-native-fast-image'
import SelectDropdown from 'react-native-select-dropdown'
import MapView, {Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux'
import { selectAddress, selectAddressMap, selectAddressMod } from '../store/Address/AddressSelector';
import { setAddressMap, setAddressMod  } from '../store/Address/AddressActCreat';
import { useNavigation } from '@react-navigation/native';
import { setAddressLoad } from '../store/User/userActCreat';

// dropdown package
// https://www.npmjs.com/package/react-native-select-dropdown


const loginValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('აუცილებელია სახელის შეყვანა'),
  lastName: yup
    .string()
    .required('აუცილებელია გვარის შეყვანა'),
  mobile: yup
    .string()
    .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "მობილური ნომერი არასწორია"
      )
    .required('შევსება აუცილებელია'),
  postal: yup
    .string()
    .matches(/^[0-9]+$/, "საფოსტო ინდექსი უნდა შეიცავდეს მხოლოდ ციფრებს")
    .required('საფოსტო ინდექსის შევსება აუცილებელია'),
 
})



const AddAddressScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const nav = useNavigation()
    const ADDRESSDATA = useSelector(selectAddress)
    const ADRESMOD = useSelector(selectAddressMod)
    const ADDRESSMAP = useSelector(selectAddressMap)
    const [map, setMap] = useState(false)
    const [cntry, setCntry] = useState(null)
    const [reg, setReg] = useState(null)
    const [ct, setCt] = useState(null)
    const [LatLng, setLatLng] = useState('')
    const [OpenMap, setOpenMap] = useState(false)

    const country = ["საქართველო"]
    const region = ["იმერეთი"]
    const city = ["ქუთაისი"]

    
    const [toke, setToke] = useState(null)

    const SetTOKENNN = async () => {
        const TOKEN = await AsyncStorage.getItem('TOKEN')
        .then((value) => setToke(value))
    }
   
    
    useEffect(() => {
      if (toke == null || toke == undefined) {
          SetTOKENNN()
      } else {
          null
      }
    
    }, [toke])

    const getAddress = (mark) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${mark.latitude}&lon=${mark.longitude}`)
        .then((res) => res.json())
        .then((db) => {
            dispatch(setAddressMap({
                choosen: true,
                fullAdr:  db.address.house_number !== NaN && db.address.house_number !== undefined  
                ? 
                (db.address.road !== NaN && db.address.suburb !== NaN && db.address.road !== undefined && db.address.suburb !== undefined ?
                     (`${Number(db.address.house_number)}, ${db.address.road}, ${db.address.suburb}`) 
                     : 
                     ('მისამართი არ მოიძებნა')
                     ) 
                : 
                ( db.address.road !== NaN && db.address.suburb !== NaN  &&
                    db.address.road !== undefined && db.address.suburb !== undefined ?
                     (`${db.address.road},   ${db.address.suburb}`) 
                     : 
                     ('მისამართი არ მოიძებნა')
                    
                    
                    ),
                lat: mark.latitude,
                lng: mark.longitude,
            }))
        }
            )
            
        } 

    useEffect(() => {
        if(LatLng !== '')
        getAddress(LatLng)
    }, [LatLng])

    
    
    
    

    useEffect(() => {
    }, [map])


    useEffect(() => {
    }, [cntry])
    
    
    useEffect(() => {
    }, [reg])
    
    
    useEffect(() => {
    }, [ct])

    useEffect(() => {
     
    }, [ADRESMOD])

    useEffect(() => {
     
    }, [ADDRESSMAP])


    useEffect(() => {
      
    }, [OpenMap])
    
    

    




    return (
        <SafeAreaView style={styles.container1}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
            <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ 
                name: '' ,
                lastName: '' ,
                address: '' ,
                mobile: '' ,
                postal: '' ,
        }}
            onSubmit={values => {
                let options = {}
                if(cntry !== null && reg !== null && ct !== null )
   if(ADRESMOD.editable == true ) {
    options = {
    FIRST_NAME: values.name,
    LAST_NAME: values.lastName,
    ADDRESS: ADDRESSMAP.choosen == true ? (ADDRESSMAP.fullAdr) : (values.address),
    ZIPCODE: values.postal,
    LATITUDE: ADDRESSMAP.choosen == true ? (ADDRESSMAP.lat) : (0),
    LONGITUDE: ADDRESSMAP.choosen == true ? (ADDRESSMAP.lng) : (0),
    CONTACT_PHONE: values.mobile,  
    TOKEN: toke,
    UID: ADRESMOD.item.UID,
    COUNTRY: cntry,
    CITY: ct,
    REGION: reg,
   }
   } else {
    options = {
    FIRST_NAME: values.name,
    LAST_NAME: values.lastName,
    ADDRESS: ADDRESSMAP.choosen == true ? (ADDRESSMAP.fullAdr) : (values.address),
    ZIPCODE: values.postal,
    LATITUDE: ADDRESSMAP.choosen == true ? (ADDRESSMAP.lat) : (0),
    LONGITUDE: ADDRESSMAP.choosen == true ? (ADDRESSMAP.lng) : (0),
    CONTACT_PHONE: values.mobile,  
    TOKEN: toke,
    COUNTRY: cntry,
    CITY: ct,
    REGION: reg,
   }
   }
      fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },             
             body: JSON.stringify({
                  ApiMethod: ADRESMOD.editable == true ? 'EditAddress' : 'AddNewAddress',
                  controller: 'Address',
                  pars: options,
            }),
           
            
        }).then(db =>{
              db.json().then(json => {  
              if(json.status == 'success' )
              {    
                dispatch(setAddressMod({
                  editable: false,
                  item: '',
                  open: false,
                }))   
                dispatch(setAddressLoad(true))
                nav.goBack()           
                // window.location.reload()
            } else {
                Alert.alert('ყურადღება','დროებით შეუძლებელია მისამართის დამატება')
                dispatch(setAddressMod({
                    editable: false,
                    item: '',
                    open: false,
                })) 
                dispatch(setAddressMap({
                    choosen: false,                  
                })) 
                dispatch(setAddressLoad(true))
                nav.goBack()           
              } 
            })             
          })
    }
            }
            >
                {(props) => {
                    return (
                    <React.Fragment>

                    <TouchableOpacity
                                onPress={() =>  nav.goBack()}
                                style={styles.GoBack}>
                                <Image source={require('../Photos/goback.png')}
                        style={styles.GobackIcon} 
                        />
                        <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>
                                    
                    </TouchableOpacity>
                    <FastImage
                    style={styles.SignUpImg}
                    source={{
                        uri: 'https://cdn.mego.ge/img/logo.png',
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.SignUpHead}>დაამატეთ ახალი მისამართი</Text>
                    <TextInput 
                    placeholderTextColor="#A0A0A0"
                    placeholder={ADRESMOD.editable == true ? ADRESMOD.item.FIRST_NAME : "თქვენი სახელი "}
                    style={styles.SignUpInp}
                    defaultValue={''}
                    onChangeText={props.handleChange('name')}
                    onBlur={props.handleBlur('name')}
                    value={props.values.name}
                    ></TextInput>
       {props.errors.name &&
         <Text style={styles.SignErr}>{props.errors.name}</Text>
       }
                    <TextInput 
                    placeholderTextColor="#A0A0A0"
                    placeholder={ADRESMOD.editable == true ? ADRESMOD.item.LAST_NAME : "თქვენი  გვარი"}
                    style={styles.SignUpInp}
                    defaultValue={''}
                    onChangeText={props.handleChange('lastName')}
                    onBlur={props.handleBlur('lastName')}
                    value={props.values.lastName}
                    ></TextInput>
       {props.errors.lastName &&
         <Text style={styles.SignErr}>{props.errors.lastName}</Text>
       }
                    <SelectDropdown
                    defaultButtonText='ქვეყანა*'
                    buttonStyle={styles.SignUpInp}
            data={country}
            onSelect={(selectedItem, index) => {
                setCntry(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
        />
                

        <SelectDropdown
            buttonStyle={styles.SignUpInp}
            defaultButtonText='ქალაქი*'
            data={city}
            onSelect={(selectedItem, index) => {
                setCt(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
        />
                   

        <SelectDropdown
        defaultButtonText='რეგიონი*'
        buttonStyle={styles.SignUpInp}
            data={region}
            onSelect={(selectedItem, index) => {
                setReg(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
        />
                    <TextInput 
                    placeholderTextColor="#A0A0A0"
                    placeholder={ADRESMOD.editable == true ? ADRESMOD.item.ZIPCODE : "საფ-ინდექსი"}
                    style={styles.SignUpInp}
                    defaultValue={''}
                    onChangeText={props.handleChange('postal')}
                    onBlur={props.handleBlur('postal')}
                    value={props.values.postal}
                    keyboardType="numeric"
                    ></TextInput>
       {props.errors.postal &&
         <Text style={styles.SignErr}>{props.errors.postal}</Text>
       }
                    
                    <TextInput 
                    placeholderTextColor="#A0A0A0"
                    placeholder={ADRESMOD.editable == true ? ADRESMOD.item.CONTACT_PHONE : "მობილური ნომერი"}
                    style={styles.SignUpInp}
                    defaultValue={''}
                    onChangeText={props.handleChange('mobile')}
                    onBlur={props.handleBlur('mobile')}
                    value={props.values.mobile}
                    keyboardType="numeric"
                    ></TextInput>
       {props.errors.mobile &&
         <Text style={styles.SignErr}>{props.errors.mobile}</Text>
        }
                    <TextInput 
                    placeholderTextColor="#A0A0A0"
                    required
                    placeholder={ADRESMOD.editable == true ? ADRESMOD.item.ADDRESS : "თქვენი მისამართი"}
                    style={styles.SignUpInp}
                    defaultValue={''}
                    onChangeText={props.handleChange('address')}
                    onBlur={props.handleBlur('address')}
                    value={ ADDRESSMAP.choosen == true ? (ADDRESSMAP.fullAdr) : (props.values.address) }
                    ></TextInput>
            

           
                <TouchableOpacity style={styles.MapBtn}
                onPress={() => { if(OpenMap == true){
                    setOpenMap(false)
                    dispatch(setAddressMap({
                        choosen: false,
                        fullAdr: '',
                        lat: '',
                        lng: '',
                    }
                    ))
                } else {
                    setOpenMap(true)
                } 
                }}
                >
                    <Text style={styles.UnivText}>ან აირჩიეთ რუკაზე</Text>
                </TouchableOpacity>
            
                {OpenMap == true ? (
                   <View style={{width: '80%', height: 250, marginTop: 30, marginBottom: 30,}}>

                   <MapView
                   provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                   minZoomLevel={10}
                   zoomEnabled={true}
                   zoomControlEnabled={true}
                   style={{width: '100%', height: 250, }}
                   onPress={ (cord) =>   setLatLng(cord.nativeEvent.coordinate)
                   }
                   initialRegion={{
                       latitude: 42.2716455,
                       longitude: 42.705359,
                       latitudeDelta: 0.0922,
                       longitudeDelta: 0.0421,
                   }}
                   >
                   {LatLng !== '' ? (
                       <Marker 
                       coordinate={{
                        longitude: LatLng.lng ? LatLng.lng  : 0,
                        latitude: LatLng.lat ? LatLng.lat : 0
                      }}
                      image={require('../Photos/marker.png')}
                       ></Marker>
                   ) : (null)}
                   </MapView>
                   </View>
                ) : (
                   null
                )}
                        

                    <View style={styles.btnsCont}>

                    <TouchableOpacity
                    onPress={() => props.handleSubmit()}
                    style={styles.SignUpBtn}
                    >
                        <Text style={styles.UnivText}>დამატება</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={async () => {
                      await  dispatch(setAddressMod({
                            editable: false,
                            item: '',
                            open: false,
                          }))
                      await dispatch(setAddressMap({
                            choosen: false,
                            fullAdr: '',
                            lat: '',
                            lng: '',                  
                          }))
                       await   nav.goBack()
                    }}
                    style={styles.CancelBtn}
                    >
                        <Text style={styles.UnivText}>გაუქმება</Text>
                    </TouchableOpacity>
                        </View>
                    </React.Fragment>
                    )

                }}
                
            </Formik>
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
    },
    container1: {
        backgroundColor: '#fcd895',
        width: '100%',
    },
    SignUpInp: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5 ,
        width: '80%',
        height: 50,
        textAlign: 'center',
        marginTop: 35,
        marginBottom: 5,
        fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    },
    SignUpImg: {
        width: 200, 
        height: 200, 
        resizeMode: 'contain',
        marginTop: 0,
    },
    SignUpBtn: {
        backgroundColor: '#ed8d2d',
        borderRadius: 5,
        padding: 10,
        width: 110,
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 30,
        fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    }, 
    SignUpHead: {
        color: '#ed8d2d', 
        paddingBottom: 40, 
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Verdana',
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    }, 
    SignUpBtnPin: {
        backgroundColor: '#ed8d2d',
        borderRadius: 5,
        padding: 10,
        width: 130,
        alignItems: 'center',
        marginTop: 30,
        fontFamily: 'Verdana',
color: 'black', 
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
        
    },
    checkCont: {
       display: 'flex',
       flexDirection: 'row',
       alignItems: 'center',
       marginTop: 30,
    },
    SignupCheck: {
        marginRight: 40,
        width: 6,
    },
    ForgBtn1: {
        color: '#ed8d2d',
        textDecorationLine: 'underline',
        fontSize: 17,
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingTop: 10,
        marginTop: 40,
        ...Platform.select({
            android: {
                marginTop: 10,
            }
        })
    }, 
    SignErr: { 
        fontSize: 10, 
        color: 'red', 
        fontFamily: 'Verdana',
    ...Platform.select({
     android: {
       fontFamily: 'Roboto', 
     }
   })
    },
    CancelBtn: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 10,
        width: 110,
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 30,
    },
    btnsCont: {
        width: '65%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    MapBtn: {
        backgroundColor: '#ed8d2d',
        padding: 10,
        marginTop: 30,
    },
    UnivText: {
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



export default AddAddressScreen