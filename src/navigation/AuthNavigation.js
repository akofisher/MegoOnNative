import React, { useState, useEffect } from "react"
import { View } from 'react-native'
import ForgotPassword from "../screens/ForgotPassword"
import SignupScreen from "../screens/SignupScreen"
import LoginScreen from "../screens/LoginScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DrawerNavigator from "./DrawerNavigator"
import CartScreen from "../screens/CartScreen"
import SingleProdScreen from "../screens/SingleProdScreen"
import SearchScreen from "../screens/SearchScreen"
import AddAddressScreen from "../screens/AddAddressScreen"
import PasswordChangeScreen from "../screens/PasswordChangeScreen"
import PhoneNumChangeScreen from "../screens/PhoneNumChangeScreen"
import WishScreen from "../screens/WishScreen"
import CheckoutScreen from "../screens/CheckoutScreen"
import ProfileDeletion from "../screens/ProfileDeletion"
import UserRecovery from "../screens/UserRecovery"



const Stack = createNativeStackNavigator()


const AuthNavigator = () => {




    return (
        <Stack.Navigator initialRouteName="DrawerNavigator">

            <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Signup' component={SignupScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Forgot' component={ForgotPassword} />
            <Stack.Screen options={{ headerShown: false }} name='UserRecovery' component={UserRecovery} />
            <Stack.Screen options={{ headerShown: false }} name='DrawerNavigator' component={DrawerNavigator} />
            <Stack.Screen options={{ headerShown: false }} name='Cart' component={CartScreen} />
            <Stack.Screen options={{ headerShown: false }} name='SingleProd' component={SingleProdScreen} />
            <Stack.Screen options={{ headerShown: false }} name='SearchScr' component={SearchScreen} />

            <Stack.Screen options={{ headerShown: false }} name='AddAddress' component={AddAddressScreen} />
            <Stack.Screen options={{ headerShown: false }} name='PassChange' component={PasswordChangeScreen} />
            <Stack.Screen options={{ headerShown: false }} name='NumChange' component={PhoneNumChangeScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Wish' component={WishScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Checkout' component={CheckoutScreen} />
            <Stack.Screen options={{ headerShown: false }} name='ProfileDeletion' component={ProfileDeletion} />

        </Stack.Navigator>


    )
}


export default AuthNavigator