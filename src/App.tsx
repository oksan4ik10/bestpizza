import { useEffect, useState } from 'react'

import { useAppDispatch } from './store/store'
import { setCount } from './store/reducers/countCardReducer'

import { ICardLocal } from './models/type'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'


import MainPage from './pages/MainPage/MainPage'
import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import Auth from './components/Auth/Auth'

import ModalCart from './components/ModalCart/ModalCart'
import ModalOrder from './components/ModalOrder/ModalOrder'
import ModalFinishOrder from './components/ModalFinishOrder/ModalFinishOrder'



function App() {

  const [restaurant, setRestaraunt] = useState("");
  const changeRestaurant = (str: string) => {
    setRestaraunt(str);
  }

  const [isAuth, setIsAuth] = useState(false)
  const openAuth = () => {
    document.body.classList.add("auth")
    setIsAuth(true)
  }
  const closeAuth = () => {
    document.body.classList.remove("auth")
    setIsAuth(false)
  }


  const [isCart, setIsCart] = useState(false);
  const openCart = () => {
    document.body.classList.add("auth")
    setIsCart(true)
  }

  const closeCart = () => {
    document.body.classList.remove("auth")
    setIsCart(false)
  }


  const [isOrder, setIsOrder] = useState(false);
  const openOrder = () => {
    document.body.classList.add("auth")
    setIsOrder(true)
  }
  const closeOrder = () => {
    document.body.classList.remove("auth")
    setIsOrder(false)
  }

  const [isFinishOrder, setFinishIsOrder] = useState(false);
  const openFinishOrder = () => {
    document.body.classList.add("auth")
    setFinishIsOrder(true)
  }
  const closeFinishOrder = () => {
    document.body.classList.remove("auth")
    setFinishIsOrder(false)
  }

  const dispatch = useAppDispatch()
  useEffect(() => {
    const localCard = localStorage.getItem("card")
    const card: ICardLocal[] = localCard ? JSON.parse(localCard) : [];
    const count = card.reduce((prev, cur) => prev + cur.count, 0)
    dispatch(setCount(count))
  }, [])


  return (
    <>


      {isAuth && <Auth closeAuth={closeAuth}></Auth>}
      {isCart && <ModalCart openOrder={openOrder} closeCart={closeCart} />}
      {isOrder && <ModalOrder closeOrder={closeOrder} closeCart={closeCart} openFinishOrder={openFinishOrder} closeFinishOrder={closeFinishOrder}></ModalOrder>}
      {isFinishOrder && <ModalFinishOrder></ModalFinishOrder>}

      <Header clickLogo={() => setRestaraunt("")} openAuth={openAuth} openCart={openCart}></Header>
      {!restaurant && <MainPage changeRestaurant={changeRestaurant}></MainPage>}
      {restaurant && <RestaurantPage openAuth={openAuth} restaurant={restaurant}></RestaurantPage>}
      <Footer clickLogo={() => setRestaraunt("")}></Footer>
    </>
  )
}

export default App
