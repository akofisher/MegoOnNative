import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import { selectLogedin } from "../store/User/userSelector"
import AuthNavigator from './AuthNavigation';
// import DrawerNavigator from './DrawerNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import RootNavigator from './RootNavigation';
import { setLogedin } from '../store/User/userActCreat';
import { ActivityIndicator } from 'react-native';



const linking = {
  prefixes: ['https://mego.ge', 'https://mego.ge/', 'mego.ge', 'mego']
};


const SecureNavigator =() => {
  const Stack = createNativeStackNavigator()
  const dispatch = useDispatch()
  const USERLOG = useSelector(selectLogedin)
  const [useR, setUseR] = useState(null)

  
  
  
  const FetchUser = async () => {
    const USER = await AsyncStorage.getItem('User')
    .then((value) => setUseR(value))
    if(useR !== null) {
      dispatch(setLogedin({isLogedin: true}))
    } else if (useR == null) {
      dispatch(setLogedin({isLogedin: false}))
    }
  }
  
  
useEffect(() => {
   FetchUser()
}, [useR])


  //  const AuthNavigation = <Stack.Screen name="AuthStack" component={AuthNavigator} options={{ headerShown: false }} />;

  // const DefaultNavigation = (
  //   <Stack.Screen name="RootNavigator" component={RootNavigator} options={{ headerShown: false }} />
  // );

  return (
    <NavigationContainer 
    linking={linking}
    fallback={<ActivityIndicator color="blue" size="large" />}
      >
    <Stack.Navigator>
    <Stack.Screen name="AuthStack" component={AuthNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
   
  )
}


export default SecureNavigator