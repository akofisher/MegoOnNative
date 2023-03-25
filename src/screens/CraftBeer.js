import React, {useEffect} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import ProdCard from '../components/ProdCard'
import { setDraftBeer } from '../store/Products/prodActCreat'
import { useDispatch, useSelector } from 'react-redux'
import { selectdraftBeer } from '../store/Products/prodSelector'
import { API } from '../API/APIs'
import { selectBeerLoad } from '../store/User/userSelector'
import { setBeerLoad } from '../store/User/userActCreat'
import Loader from '../components/Loader'
import DraggablePopup from '../components/DraggablePopup'


const card = ({item}) => {
  return (
      <ProdCard item={item}/>
  )
}

export default function CraftBeer() {
const DraftBeer = useSelector(selectdraftBeer)
const dispatch = useDispatch()
const BrLoad = useSelector(selectBeerLoad)


const FetchingBeer = () => {
  fetch(API, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
         ApiMethod: 'GetProductByCat',
        controller: 'Product',
        pars: {
            CATEGORY_ID: 9030,
        },
    }),
}).then(db =>{
       db.json().then(json => {            
      if(json.status === 'success' )
      {    
       dispatch(setDraftBeer(json.data))           
       
      } 
    })             
  })
}

useEffect(() => {
  if(BrLoad) {
    FetchingBeer()
    dispatch(setBeerLoad(false))
  }
}, [BrLoad])





  useEffect(() => 
        {   
     FetchingBeer()
          
  }, [])



  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <DraggablePopup/>
      {BrLoad ? (
        <Loader/>
      ) : (
        <React.Fragment>

            {DraftBeer.length > 0 ? (
              
              <SafeAreaView style={styles.specsContainer}>
                    <Text style={styles.specHeader}>ლუდი</Text>
            <FlatList
                data={DraftBeer}
                renderItem={card}
                keyExtractor={item => item.UID}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                key={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                />
                </SafeAreaView>
            ) :
            (null)}
        
            </React.Fragment>
      )}
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcd895',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    zIndex: 2,

    
},
specsContainer: {
  minWidth: '100%',
  alignItems: 'center',
  marginBottom: 20,
  ...Platform.select({
      android: {
        paddingBottom: 110,
      }
    })
},
specHeader: {
  color: '#ed8d2d', 
  fontSize: 16, 
  fontWeight: 'bold',
  paddingTop: 0,
  paddingBottom: 20,
  fontFamily: 'Verdana', 
  ...Platform.select({
    android: {
      fontFamily: 'Roboto', 
        paddingTop: 20,
        paddingBottom: 10,
      }
    })
},
})
