import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen'
import CraftBeer from '../screens/CraftBeer';
import {Image} from 'react-native'


const BottomTabNavigator = ({navigation}) => {
  const Tab = createBottomTabNavigator();
    return (

        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({route}) => ({
          tabBarActiveTintColor: "#ed8d2d",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarStyle: [
            {
              display: "flex",
            },
            null
          ],
          headerShown: false,
          tabBarIcon: ({focused,}) => {
            let icon;
            let rn = route.name;

            if(rn === 'Home') {
              return <Image source={require('../Photos/homeIcon.png')}
              style={{width: 25, height: 25, tintColor: (focused ? '#ed8d2d' : 'black')}} 
              />
            } else if (rn === 'Beer') {
              return <Image source={require('../Photos/beer.png')}
              style={{width: 25, height: 25, tintColor: (focused ? '#ed8d2d' : 'black')}} 
              />
            } 
            
          }
        })}
       
        >
            <Tab.Screen name="Home" component={MainScreen} />
            <Tab.Screen name="Beer" component={CraftBeer} />
        
        
        </Tab.Navigator>
    )
}
export default BottomTabNavigator