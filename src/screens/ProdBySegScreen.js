import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../API/APIs';
import SegmentScreen from './SegmentScreen';
import { setProductsByCat } from '../store/Products/prodActCreat';
import { selectProductsByCat } from '../store/Products/prodSelector';
import ProdCard from '../components/ProdCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectLoading } from '../store/User/userSelector';
import { setLoading } from '../store/User/userActCreat';
import Loader from '../components/Loader';


const card = ({ item }) => {
  return (
    <ProdCard item={item} />
  )
}


const ProdBySeg = ({ route, props }) => {
  const { CategId, Name } = route.params
  const prodByCat = useSelector(selectProductsByCat)
  const dispatch = useDispatch()
  const nav = useNavigation()
  const loading = useSelector(selectLoading)






  useEffect(() => {
    dispatch(setLoading(true))
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ApiMethod: 'GetProductByCat',
        controller: 'Product',
        pars: {
          CATEGORY_ID: CategId,
        },
      }),
    }).then(db => {
      db.json().then(json => {
        if (json.status === 'success') {
          dispatch(setProductsByCat(json.data))
          dispatch(setLoading(false))

        } else {
          dispatch(setLoading(true))
        }
      })
    })
  }, [CategId])








  return (

    <SegmentScreen>
      <>
        {/* <View style={styles.container}> */}
        <TouchableOpacity
          onPress={() => nav.goBack()}
          style={styles.GoBack}>
          <Image source={require('../Photos/goback.png')}
            style={styles.GobackIcon}
          />
          <Text style={styles.CartGoBack}>უკან დაბრუნება</Text>

        </TouchableOpacity>
        <Text style={styles.specHeader}>{Name}</Text>
        {loading ? (
          <View style={styles.specsContainer}>
            <Loader />
          </View>
        ) : (
          <SafeAreaView style={styles.specsContainer}>

            <FlatList
              data={prodByCat}
              renderItem={card}
              keyExtractor={item => item.UID}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              numColumns={2}
              key={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </SafeAreaView>
        )}

        {/* </View> */}
      </>
    </SegmentScreen>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcd895',
    alignItems: 'center',
    width: '100%',
  },
  specsContainer: {
    minWidth: '100%',
    alignItems: 'center',
    paddingBottom: 360,
    ...Platform.select({
      android: {
        marginBottom: 150,
      }
    })
  },
  specHeader: {
    color: '#ed8d2d',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 20,
    fontFamily: 'Verdana',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
        paddingTop: 80,
        paddingBottom: 30,
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



export default ProdBySeg
