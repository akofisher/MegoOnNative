import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLogedin } from '../../store/User/userActCreat';
import { selectLogedin } from '../../store/User/userSelector';

const customDrawer = (props) => {
  const LOGEDIN = useSelector(selectLogedin)
  const [user, setUser] = useState('')
  const dispatch = useDispatch()
  const USERLOG = useSelector(selectLogedin)









  useEffect(() => {


  }, [USERLOG])








  useEffect(() => {
    const USER_NAME = AsyncStorage.getItem('User')
      .then((value) => setUser(value))

  }, [LOGEDIN])


  return (

    <SafeAreaView style={styles.CustomDrawerCont}>

      {USERLOG.isLogedin ? (
        <React.Fragment>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              backgroundColor: '#f6f6f6',
              marginBottom: 20,
              width: '100%'
            }}

          >
            <View>
              <Text style={styles.UnivText}>გამარჯობა !</Text>
              <Text style={{
                paddingTop: 5, fontWeight: 'bold', fontFamily: 'Verdana',
                ...Platform.select({
                  android: {
                    fontFamily: 'Roboto',
                  }
                })
              }}>
                {user ? user.toUpperCase() : null}
              </Text>
            </View>
            <Image
              source={require('../../Photos/userr.png')}
              style={{ width: 60, height: 50, borderRadius: 30, resizeMode: 'contain', }}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
              style={styles.DrawerItems}>
              <Image source={require('../../Photos/cashBack.png')}
                style={styles.DrawerIcons}
              />
              <Text style={styles.Texts}>ქეშბექი : 0.00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
              style={styles.DrawerItems}>
              <Image source={require('../../Photos/homeIcon.png')}
                style={styles.DrawerIcons}
              />
              <Text style={styles.Texts}>მთავარი</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Orders')}
              style={styles.DrawerItems}>
              <Image source={require('../../Photos/orders.png')}
                style={styles.DrawerIcons}
              />
              <Text style={styles.Texts}>შეკვეთები</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Address')}
              style={styles.DrawerItems}>
              <Image source={require('../../Photos/address.png')}
                style={styles.DrawerIcons}
              />
              <Text style={styles.Texts}>მისამართი</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Settings')}
              style={styles.DrawerItems}>
              <Image source={require('../../Photos/settings.png')}
                style={styles.DrawerIcons}
              />
              <Text style={styles.Texts}>პარამეტრები</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.LogCont}>
            <TouchableOpacity
              style={styles.DrawerItems}
              onPress={async () => {
                await AsyncStorage.removeItem('User')
                await AsyncStorage.removeItem('UserName')
                await AsyncStorage.removeItem('TOKEN')
                await AsyncStorage.removeItem('EMAIL')
                await AsyncStorage.removeItem('MOB')
                await AsyncStorage.removeItem('ProdSeg')
                dispatch(setLogedin({ isLogedin: false, }))
                await props.navigation.navigate('Home')
              }}
            >
              <Image source={require('../../Photos/logout.png')}
                style={styles.DrawerIcons}
              />
              <Text style={styles.Texts}>სისტემიდან გასვლა</Text>
            </TouchableOpacity>

          </View>
        </React.Fragment>

      ) : (
        <React.Fragment>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              backgroundColor: '#f6f6f6',
              marginBottom: 20,
              width: '100%'
            }}

          >
            <View>
              <Text style={styles.UnivText}>გამარჯობა !</Text>

            </View>
            <Image
              source={require('../../Photos/userr.png')}
              style={{ width: 60, height: 50, borderRadius: 30, resizeMode: 'contain', }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
              style={styles.DrawerItems}>
              <Image source={require('../../Photos/homeIcon.png')}
                style={styles.DrawerIcons}
              />
              <Text style={styles.Texts}>მთავარი</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              style={styles.DrawerItems}>
              <Image source={require('../../Photos/login.png')}
                style={styles.DrawerIcons}
              />
              <Text style={styles.Texts}>სისტემაში შესვლა</Text>
            </TouchableOpacity>

          </View>
        </React.Fragment>

      )}


    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  DrawerItems: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',

  },
  Texts: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'Verdana',
    color: 'black',
    opacity: 0.7,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  CustomDrawerCont: {
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
  },
  LogCont: {

  },
  DrawerIcons: {
    width: 30,
    height: 30,
    resizeMode: 'stretch',
    marginRight: 15,
    tintColor: '#ed8d2d',

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

export default customDrawer