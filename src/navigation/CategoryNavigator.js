import React from 'react';
import BottomTabNavigator from '../navigation/BottomNavigator'
import CustomDrawer from '../components/customDrawer/customDrawer';
import ProdBySeg from '../screens/ProdBySegScreen';
import ChildCategScreen from '../screens/ChildCategScreen';
import DownChildCategScreen from '../screens/DownChildCategScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';






const CategoryNavigator = ({ navigation }) => {
    const Category = createNativeStackNavigator();


    return (

        <Category.Navigator
            initialRouteName='CategoryNavigator'

            screenOptions={() => ({
                headerShown: false,
                drawerLockMode: 'locked-closed',


            })}
            drawerContent={props => <CustomDrawer navigation={navigation} {...props} />}

        >

            <Category.Screen
                options={{
                    swipeEnabled: false,
                }}
                component={BottomTabNavigator} name='TabsNavigator' />
            <Category.Screen name='ProdBySeg' component={ProdBySeg} options={{ headerShown: false, swipeEnabled: false, }} />
            <Category.Screen name='ChildCateg' component={ChildCategScreen} options={{ headerShown: false, swipeEnabled: false, }} />
            <Category.Screen name='DownChildCateg' component={DownChildCategScreen} options={{ headerShown: false, swipeEnabled: false, }} />
        </Category.Navigator>

    );
};



export default CategoryNavigator;
