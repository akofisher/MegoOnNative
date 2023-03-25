import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loader() {
  return (
   <React.Fragment>
      <View style={{ width: 35, height: 35,  marginTop: 20, position: 'absolute', top: 80, zIndex: 999,}}>
      		
			<ActivityIndicator size="small" color="#ed8d2d" />
      	</View>
   </React.Fragment>
  )
}