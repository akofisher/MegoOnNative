import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../components/Menu'
import DraggablePopup from '../components/DraggablePopup';


const SegmentScreen = (props) => {







    return (
        <View style={styles.container}>
            <Header navigation={props.navigation} />
            <DraggablePopup />
            {/* <Menu/> */}

            {props.children}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcd895',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',


        // zIndex: 2,


    },

})



export default SegmentScreen