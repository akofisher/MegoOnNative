import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../API/APIs';
import { selectCategory } from '../store/Category/CatSelector.js'
import { setCategory } from '../store/Category/CatActionCreat.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { selectLoading } from '../store/User/userSelector';
import { setLoading } from '../store/User/userActCreat';
import Loader from './Loader';
import { selectSegmentsUID } from '../store/Segments/SegSelector';

// const transition = (
//   <Transition.Together>
//     <Transition.In type='fade' durationMs={200} />
//     <Transition.Change />
//     <Transition.Out type='fade' durationMs={200} />
//   </Transition.Together>
// );

export default function Menu() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = React.useRef();
  const dispatch = useDispatch()
  const data = useSelector(selectCategory)
  const segUID = useSelector(selectSegmentsUID)
  const [open, setOpen] = useState(false)
  const [loading1, setLoading1] = useState(true)
  const loading = useSelector(selectLoading)
  const nav = useNavigation()


  const toProdBySeg = (val) => {
    const SEGG = AsyncStorage.getItem('ProdBySeg')
      .then((value) => AsyncStorage.setItem('ProdBySeg', val.UID))
      .then(() => setOpen(false))
      .then(() => dispatch(setLoading(true)))
      .then(() => setLoading1(true))
      .then(() => nav.navigate('DrawerNavigator', { screen: 'ProdBySeg', }))

  }


  const Fetch = (val) => {
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ApiMethod: 'GetAllCategories',
        controller: 'Category',
        pars: {
          lang: 'GE',
          SEG_ID: val,
        },
      }),
    }).then(db => {
      db.json().then(json => {
        if (json.status === 'success') {
          dispatch(setCategory(json.data))
          setLoading1(false)

        } else {
          setLoading1(true)
        }
      })
    })
  }




  useEffect(() => {
    Fetch(segUID)
  }, [segUID])




  useEffect(() => {
  }, [loading])

  useEffect(() => {
    Fetch(segUID)
  }, [loading1])


  useEffect(() => {
  }, [data])




  return (
    <React.Fragment>

      {loading1 ? (
        <Loader />
      ) : (
        <View


          style={styles.container}
        >


          <TouchableOpacity

            onPress={() => {
              setOpen(true)
              if (open == true)
                setOpen(false)
              // setCurrentIndex(idx === currentIndex ? null : idx);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={styles.card}>
              <View style={styles.HEADD}>
                <Text style={styles.heading}>{data[0].SEG_NAME}</Text>
                <Image source={require('../Photos/down.png')}
                  style={styles.HeadBurgIcon}
                />
              </View>
              {open == true && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.subCategoriesList}>
                  {data.map((data, idx) => {
                    if (idx > 0)
                      return (
                        <TouchableOpacity
                          onPress={() => {


                            toProdBySeg(data)
                          }
                          }
                          key={idx}
                        >

                          <Text style={styles.bodyy}>
                            {data.CATEGORY_NAME}
                          </Text>
                        </TouchableOpacity>
                      )
                  })}
                </ScrollView>
              )}
            </View>
          </TouchableOpacity>


        </View>
      )}
    </React.Fragment>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ed8d2d',
    justifyContent: 'center',
    width: '80%',
    zIndex: 999,
    marginTop: 30,
    padding: 10,
    borderRadius: 15,
    position: 'absolute',
    top: 80,
    ...Platform.select({
      android: {
        top: 40,

      }
    })
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: -1,
    paddingRight: 10,
    fontFamily: 'Verdana',
    color: 'black',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  bodyy: {
    fontSize: 15,
    lineHeight: 32,
    fontFamily: 'Verdana',
    color: 'black',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })

  },
  subCategoriesList: {
    marginTop: 20,
    paddingBottom: 30,
    ...Platform.select({
      android: {
        paddingBottom: 80,
      }
    })
  },
  HEADD: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    width: 35,
    height: 35,
    marginTop: 20,
    position: 'absolute',
    top: 80,
    zIndex: 999,
    ...Platform.select({
      android: {
        top: 40,

      }
    })
  },
  UnivText: {
    fontFamily: 'Verdana',
    color: 'black',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },

})