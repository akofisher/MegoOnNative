import React, { useEffect } from 'react'
import {
  Platform, FlatList,
  View, SafeAreaView, Text,
  StyleSheet, Image, TextInput,
  TouchableOpacity
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearch, selectSearchOpen, selectSearchRes } from '../store/Search/searchSelector';
import { setSearch, setSearchOpen, setSearchRes } from '../store/Search/searchActCreat';
import { API } from '../API/APIs';
import { useNavigation } from '@react-navigation/native';
import SearchCard from './SearchCard';
import FastImage from 'react-native-fast-image'
import { selectCardCount } from '../store/Products/prodSelector.js'
import { selectCheckLoad } from '../store/Checkout/CheckoutSelector';
import { setCheckouLoad } from '../store/Checkout/CheckoutActionCreat';



export default function ThirdHeader({ navigation }) {
  const nav = useNavigation()
  const dispatchh = useDispatch()
  const CARDCOUN = useSelector(selectCardCount)
  const CheckLoad = useSelector(selectCheckLoad)



  useEffect(() => {
  }, [CARDCOUN])


  useEffect(() => {

    if (CheckLoad == true) {
      setTimeout(() => {
        dispatchh(setCheckouLoad(false))
      }, 150);
    }

  }, [CheckLoad])








  return (
    <React.Fragment>
      <SafeAreaView style={styles.HeaderField}>

        <TouchableOpacity
          style={styles.HeadBurgIcon1}
          onPress={() => {
            nav.navigate('SearchScr')

          }
          }
        >
          <Image source={require('../Photos/searchIcon.png')}
            style={styles.HeadBurgIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.HeadBtn}
          onPress={() => nav.navigate('Home')}
        >


          <Image
            source={{ uri: 'https://cdn.mego.ge/img/logo.png' }}
            style={styles.HeadImg1} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.HeadBurgIcon1}
          onPress={() => nav.navigate('Cart')

          }
        >
          <Image source={require('../Photos/cart.png')}
            style={styles.HeadBurgIcon}
          />
          <View style={styles.counT}>
            <Text style={styles.txtCount}>{CARDCOUN}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.HeadBurgIcon1}
          onPress={() =>
            nav.navigate('Wish')
          }
        >
          <Image source={require('../Photos/heart.png')}
            style={styles.HeadBurgIcon}
          />
        </TouchableOpacity>
      </SafeAreaView>


    </React.Fragment>
  )
}


const styles = StyleSheet.create({
  HeadImg: {
    width: '20%',
    height: 50,
    resizeMode: 'contain',
  },
  HeaderField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    zIndex: 9999,
    paddingBottom: 10,
    ...Platform.select({
      android: {
        marginTop: 10,
      }
    })
  },
  SearchInp: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    height: 45,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    position: 'relative',
  },
  HeadCanc: {
    width: '15%',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  HeadBurgIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: '#ed8d2d',
  },
  HeadBurgIcon1: {
    width: '13%',
    height: 40,
    position: 'relative',
  },
  ResContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    height: 360,
    top: 60,
    zIndex: 9999,
    borderRadius: 5,
    ...Platform.select({
      android: {
        top: 60,
      }
    })

  },
  HeadImg1: {
    width: '100%',
    height: 35,
    resizeMode: 'contain',

  },
  HeadBtn: {
    width: '35%',
    height: 35,
    paddingLeft: 5,
    paddingRight: 5,
  },
  counT: {
    position: 'absolute',
    right: -12,
    bottom: 3,
    backgroundColor: '#ed8d2d',
    borderRadius: 15,
    width: 20,
    alignItems: 'center',
  },
  txtCount: {
    color: 'white',
    fontFamily: 'Verdana',
    fontWeight: '600',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })

  }


})
