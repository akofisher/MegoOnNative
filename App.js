import React from 'react';
import {
  StyleSheet
} from 'react-native';
import store from '././src/store/store'
import { Provider } from 'react-redux';
import SecureNavigator from './src/navigation/SecureNavigator';




const App = () =>  {
  

  
  return (
<Provider store={store}>   
    <SecureNavigator/>
   </Provider>


  )
}

const styles = StyleSheet.create({
  
});

export default App;
