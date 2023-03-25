import { combineReducers } from 'redux'
import { default as search } from '../store/Search/searchReducer.js'
import { default as searchPage } from '../store/Search/searchReducer.js'
import { default as searchRes } from '../store/Search/searchReducer.js'
import { default as searchOpen } from '../store/Search/searchReducer.js'
import { default as segments } from '../store/Segments/SegmentsReducer'
import { default as childSeg } from '../store/Segments/SegmentsReducer'
import { default as downChildSeg } from '../store/Segments/SegmentsReducer'
import { default as segmentsUID } from '../store/Segments/SegmentsReducer'
import { default as products } from '../store/Products/prodReducer'
import { default as productsByCat } from '../store/Products/prodReducer'
import { default as singleProd } from '../store/Products/prodReducer'
import { default as cardCount } from '../store/Products/prodReducer'
import { default as sameProd } from '../store/Products/prodReducer'
import { default as draftBeer } from '../store/Products/prodReducer'
import { default as wishProd } from '../store/Products/prodReducer'
import { default as cart } from '../store/Products/prodReducer'
import { default as Logedin } from '../store/User/userReducer'
import { default as cartSum } from '../store/User/userReducer'
import { default as totalLoad } from '../store/User/userReducer'
import { default as specsLoad } from '../store/User/userReducer'
import { default as beerLoad } from '../store/User/userReducer'
import { default as Loading } from '../store/User/userReducer'
import { default as adrLoad } from '../store/User/userReducer'
import { default as wishLoad } from '../store/User/userReducer'
import { default as loadScr } from '../store/User/userReducer'
import { default as category } from '../store/Category/CatReducer'
import { default as address } from '../store/Address/AddressReducer'
import { default as addressMod } from '../store/Address/AddressReducer'
import { default as addressMap } from '../store/Address/AddressReducer'
import { default as selfTaking } from '../store/Address/AddressReducer'
import { default as DefAddress } from '../store/Address/AddressReducer'
import { default as payment } from '../store/Checkout/CheckoutReducer'
import { default as checkLoad } from '../store/Checkout/CheckoutReducer'
import { default as orders } from '../store/Orders/OrdersReducer'
import { default as lastOrder } from '../store/Orders/OrdersReducer'





const rootReducer = combineReducers({
    search,
    searchPage,
    segments,
    products,
    productsByCat,
    singleProd,
    sameProd,
    draftBeer,
    wishProd,
    cart,
    Logedin,
    category,
    Loading,
    segmentsUID,
    searchRes,
    searchOpen,
    cardCount,
    cartSum,
    totalLoad,
    specsLoad,
    beerLoad,
    wishLoad,
    address,
    adrLoad,
    addressMod,
    addressMap,
    payment,
    selfTaking,
    DefAddress,
    orders,
    checkLoad,
    loadScr,
    lastOrder,
    childSeg,
    downChildSeg,

})

export default rootReducer