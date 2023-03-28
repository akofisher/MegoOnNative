import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearch, selectSearchOpen, selectSearchRes } from '../store/Search/searchSelector'
import { setSearch, setSearchRes } from '../store/Search/searchActCreat'
import { API } from '../API/APIs'
import SearchCard from '../components/SearchCard'
import Loader from '../components/Loader'

export default function SearchScreen() {
  const nav = useNavigation()
  const dispatchh = useDispatch()
  const searchData = useSelector(selectSearch)
  const result = useSelector(selectSearchRes)
  const searchO = useSelector(selectSearchOpen)
  const [count, setCount] = useState('15')
  const [load, setLoad] = useState(false)



  const SearchProd = (cnt) => {
    if (result.length > 2) {
      fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApiMethod: 'SearchProduct',
          controller: 'Product',
          pars: {
            SEARCH_VALUE: result,
            OFFSET: '0',
            ITEM_COUNT: cnt,
          },
        }),
      }).then(db => {
        db.json().then(json => {
          if (json.status === 'success') {
            dispatchh(setSearch(json.data))
          }
        })
      })
    }
  }

  useEffect(() => {
    SearchProd(count)

    if (load == true)
      setTimeout(() => {
        setLoad(false)
      }, 200);

  }, [load])


  useEffect(() => {
    setLoad(true)
  }, [count])



  useEffect(() => {
    if (searchData.length > 0) {
      if (result.length == 0) {
        dispatchh(setSearch([]))
      }

    } else if (result.length >= 3) {
      SearchProd(count)
    }
  }, [result])

  useEffect(() => {

  }, [searchO])

  useEffect(() => {

  }, [searchData])


  return (
    <SafeAreaView style={styles.SearchCont}>
      <View style={styles.HeaderField}>
        <TouchableOpacity
          disabled
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
        <TextInput
          placeholderTextColor="#A0A0A0"
          autoCapitalize='none'
          autoFocus
          placeholder='პროდუქტის ძიება'
          style={styles.SearchInp}
          defaultValue={''}
          onChangeText={newResult => dispatchh(setSearchRes(newResult))}
          onChange={async () => {
            await setLoad(true)
            await SearchProd(result)

          }}
          value={result}
        ></TextInput>
        <Text
          style={styles.HeadCanc}
          onPress={async () => {
            await dispatchh(setSearchRes(''))
            await nav.goBack()
          }}
        >უკან</Text>

      </View>
      <SafeAreaView style={styles.resCONT}>
        {load ? (
          <Loader />
        ) : (result.length > 0 && searchData.length > 0 ? (
          //   <View
          //   style={styles.ResContainer}>


          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.ResScrool}
          >
            {searchData.map((item, idx) => {
              if (JSON.parse(item.STEP) !== 0 && JSON.parse(item.PRODUCT_COUNT) > 0) {
                return (
                  <SearchCard key={idx} item={item} />
                )
              } else if (JSON.parse(item.PRODUCTIVE) == 1) {
                return (
                  <SearchCard key={idx} item={item} />
                )
              }

            })}

            <TouchableOpacity
              style={styles.showMoreBtn}
              onPress={async () => {
                if (count == '15') {
                  setCount('30')
                } else if (count == '30') {
                  setCount('15')
                }
              }
              }
            >
              <Text style={styles.showMore}>{count == '15' ? ('მეტის ჩვენება') : ('ნაკლების ჩვენება')}</Text>

            </TouchableOpacity>

          </ScrollView>
          //   </View>


        ) :
          (null)

        )}


      </SafeAreaView>

    </SafeAreaView>
  )
}



const styles = StyleSheet.create({

  HeaderField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    marginBottom: 40,
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
    width: '60%',
    height: 45,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    position: 'relative',
    fontFamily: 'Verdana',
    color: 'black',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  HeadCanc: {
    width: '15%',
    marginLeft: 10,
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
  HeadBurgIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: '#ed8d2d',
  },
  HeadBurgIcon1: {
    width: '13%',
    height: 40,
    paddingLeft: 5,
    position: 'relative',
  },
  SearchCont: {
    backgroundColor: '#fcd895',
    height: '100%',
    marginBottom: 80,
    ...Platform.select({
      android: {
        marginBottom: 0,
      }
    })
  },
  SearchScHead: {
    flexDirection: 'row',
    padding: 10,
  },

  resCONT: {
    paddingBottom: 150,
    ...Platform.select({
      android: {
        paddingBottom: 20,

      }
    })
  },
  showMore: {
    fontSize: 12,
    fontFamily: 'Verdana',
    color: 'black',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  showMoreBtn: {
    width: 130,
    height: 40,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#ed8d2d',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ResScrool: {
    marginBottom: 90,
  },

})

