import React, { useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import BottomTabNavigator from '../navigation/BottomNavigator'
import CustomDrawer from '../components/customDrawer/customDrawer';
import OrdersScreen from '../screens/OrdersScreen';
import AddressScreen from '../screens/AddressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Specs from '../screens/SpecsScreen';
import ProdBySeg from '../screens/ProdBySegScreen';
import CurOrderScreen from '../screens/CurOrderScreen';
import ChildCategScreen from '../screens/ChildCategScreen';
import DownChildCategScreen from '../screens/DownChildCategScreen';
import CategoryNavigator from './CategoryNavigator';






const DrawerNavigator = ({ navigation }) => {
  const Drawer = createDrawerNavigator();


  return (

    <Drawer.Navigator
      initialRouteName='Home'

      screenOptions={() => ({
        headerShown: false,
        drawerLockMode: 'locked-closed',


      })}
      drawerContent={props => <CustomDrawer navigation={navigation} {...props} />}

    >

      <Drawer.Screen
        options={{
          swipeEnabled: false,
        }}
        component={BottomTabNavigator} name='TabsNavigator' />
      <Drawer.Screen name='Orders' component={OrdersScreen} options={{ headerShown: false, swipeEnabled: false, }} />
      <Drawer.Screen name='Address' component={AddressScreen} options={{ headerShown: false, swipeEnabled: false, }} />
      <Drawer.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false, swipeEnabled: false, }} />
      <Drawer.Screen name='Specs' component={Specs} options={{ unmountOnBlur: true, headerShown: false, swipeEnabled: false, }} />
      <Drawer.Screen name='CategoryNavigator' component={CategoryNavigator} options={{ headerShown: false, swipeEnabled: false, }} />
      <Drawer.Screen name='CurOrder' component={CurOrderScreen} options={{ headerShown: false, swipeEnabled: false, }} />
    </Drawer.Navigator>

  );
};



export default DrawerNavigator;
