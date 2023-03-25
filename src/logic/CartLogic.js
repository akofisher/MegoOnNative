import AsyncStorage from "@react-native-async-storage/async-storage";


let item = new Map();
let totals = {};

const Getitem = async () => {
    const ItemsFromCart = await AsyncStorage.getItem('UserCart')
    .then((value) => {
        if(value !== null || value !== undefined)
        item.set(value)
    }
    )
}
const GetTotals = async () => {
  const ItemsFromCart = await AsyncStorage.getItem('TOTALS')
  .then((value) => {
      if(value !== null || value !== undefined)
      totals = JSON.parse(value)
  }
  )
}


export const SaveCart = (cartItem, cartCount) => {
    let UserCart = item; 
    
    if(UserCart == null || UserCart == undefined ) 
    {
        
        // Getitem()
        // UserCart = item; 
        let item_array = new Map();
      item_array.set(cartItem.UID, cartItem);   
      item_array.get(cartItem.UID).PRODUCT_CART_COUNT = Number(cartCount);  
      AsyncStorage.setItem('UserCart', JSON.stringify(Array.from(item_array.entries())));
     
    }
    else
    {
      
      
      
      
        if(UserCart.get(cartItem.UID) != undefined || UserCart.get(cartItem.UID) != null) 
        {   
            UserCart.get(cartItem.UID).PRODUCT_CART_COUNT += Number(cartCount);
            AsyncStorage.setItem('UserCart', JSON.stringify(Array.from(UserCart.entries())));   
        } else 
        { 
            UserCart.set(cartItem.UID, cartItem);
            UserCart.get(cartItem.UID).PRODUCT_CART_COUNT = Number(cartCount); 
            AsyncStorage.setItem('UserCart', JSON.stringify(Array.from(UserCart.entries())));
        }
    }
}
   
// const [total, setTotal] = useState()

// const GetTotals = async () => {
//     const  TotalsFromtCart = await AsyncStorage.getItem('TOTALS')
//     .then((val) => setTotal([val]))
    
// }
export const GetCartCount = () => {
    let UserCart = item;
    
      if(UserCart == null || UserCart == undefined ) 
       return 0;
       else
       {
          UserCart = new Map(item);     
              return UserCart.size
           
            
         
       }
   }
   
   export const LoadCart = () => {
     let UserCart = item;
    
     if(UserCart == null || UserCart == undefined ) 
      return null;
   
      return new Map(item);
      
   }
   
   export const ChangeCartItemCount = (UID, cartCount) => {
       
    let UserCart = item;
      
   
      if(UserCart.get(UID) != undefined || UserCart.get(UID) != null) 
      {        
        UserCart.get(UID).PRODUCT_CART_COUNT += Number(cartCount);
        AsyncStorage.setItem('UserCart', JSON.stringify(Array.from(UserCart.entries())));   
       } 
   }
   
   export const RemoveFromCart =  (UID) => {
      let UserCart = item;

   
      if(UserCart.get(UID) != undefined || UserCart.get(UID) != null) 
      {        
        UserCart.delete(UID);
         AsyncStorage.setItem('UserCart', JSON.stringify(Array.from(UserCart.entries()))); 
        
        
        if(item.size == 0) {
          
             AsyncStorage.removeItem('UserCart');
        
          
        }
      }
    
       }
   
   export const CartSumData = () => {
     let UserCart = item;
     
     
     let CartSum = 0;
     let Shipping = 0;
     let Pack = 0;
     let Total = 0;
     let TOTALS = {};
     
     Array.from(UserCart.values()).map((card, i) => {
       
       if(card.SALE_PERCENT > 0 && card.SALE_PRICE > 0){
         CartSum += (card.SALE_PRICE * card.PRODUCT_CART_COUNT);
        } else {
          CartSum += (card.PRODUCT_PRICE * card.PRODUCT_CART_COUNT);
        }
        
        
        
      })
      
      if(CartSum>0)
      {
        
        if(CartSum <= 20) 
        Shipping = 2.99;
        
        Pack = (CartSum + Shipping) * 0.015;
        
        Total = CartSum + Shipping + Pack;
      }
      
      TOTALS = {'CartSum':Number(CartSum),'Shipping': Number(Shipping),'Pack': Number(Pack),'Total': Number(Total)};
      AsyncStorage.setItem('TOTALS', JSON.stringify(TOTALS));
      
      
      // function financial2(x) {
        //   return Number.parseFloat(x).toFixed(2);
        // }
        
        
        //  if(document.getElementById('CartSum') != null) {
          //     //  GetTotals()
          //    let SUM = totals
    //    document.getElementById('CartSum').innerHTML = `${financial2(Number(SUM.CartSum))}₾`;
    //    document.getElementById('Shipping').innerHTML = `${financial2(Number(SUM.Shipping))}₾`;
    //    document.getElementById('Pack').innerHTML = `${financial2(Number(SUM.Pack))}₾`;
    //    document.getElementById('Total').innerHTML = `${financial2(Number(SUM.Total))}₾`;
    //  }
    
    if(CartSum <= 0) {
      AsyncStorage.removeItem('TOTALS')
    }
    
    GetTotals()
   
     
     return totals;     
     
   
   }
   
   
   
   
   // export const AddCartToCart = () => {}
   // export const continueCart = () => {}
   // export const finalCart = () => {}
   
   
   
   