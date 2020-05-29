import React,  { useCallback, useState } from 'react';
import * as eva from '@eva-design/eva';
import { IconRegistry, ApplicationProvider, Text } from '@ui-kitten/components';
import { StyleSheet, Image, View, SafeAreaView, SectionList, Alert } from 'react-native';
import AppBottomNavigation from './components/BottomTabs'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexPage from './pages/index'
import ShoppingCart from './pages/ShoppingCart'
import MyselfPage from './pages/Myself'
import ShoppingList from './pages/ShoppingList'
import UserInfo from './pages/UserInfo'
import Order from './pages/Order'
import Collection from './pages/Collection'
import GoodsDetails from './pages/GoodsDetails'
import { YellowBox } from 'react-native';
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import * as SQLite from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import ProductsModel from './model/products'
import CollectionModel from './model/collection'
import CartModel from './model/cart'


YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(reducer)

const productsData = [
  {
    title: "法式布蕾拿铁",
    english: "French Caramel Pudding Latte",
    price: "20",
    sort: "大/默认奶油/半糖/冰",
  },
  {
    title: "香草风味瑞纳冰",
    english: "Classic Vanilla Flavored Exfreezo",
    price: "18",
    sort: "大/默认奶油/冰",
  },
  {
    title: "秦岛桃桃冰",
    english: "Peach Rose Exfreezo",
    price: "19",
    sort: "大/默认奶油/冰",
  },
  {
    title: "陨石拿铁",
    english: "Brown Sugar BoBo Latte",
    price: "16.8",
    sort: "大/默认奶油/半糖/热",
  }
]

function TabScreen() {
  return (
    <Tab.Navigator tabBar={props => <AppBottomNavigation {...props} store={store} />}>
      <Tab.Screen name="Home" component={IndexPage} />
      <Tab.Screen name="ShoppingList" component={ShoppingList} />
      <Tab.Screen name="ShoppingCart" component={ShoppingCart} />
      <Tab.Screen name="MyselfPage" component={MyselfPage} />
    </Tab.Navigator>
  )
}

const initDatabase = async () => {
  const createTable = useCallback(async () => {
    await ProductsModel.createTable()
    await CollectionModel.createTable()
    await CartModel.createTable()
  }, [])

  const createProducts = useCallback(async () => {
    let res = await ProductsModel.query({ columns: 'id' })
    if (res && res.length > 0) {
      return
    } else {
      const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('starbugs.db'), 'products')
      databaseLayer.bulkInsertOrReplace(productsData).then(response => {
        console.log(response)
      })
    }
  }, [])


  await createTable()
  await createProducts()
  let data = await ProductsModel.query()
  let initData = {}
  for (let i in data){
    initData[data[i].id] = data[i]
  }
  store.dispatch({ type: "RECEIVE_PRODUCTS", data: initData })
  data = await CollectionModel.query()
  initData = []
  for (let i in data){
    initData.push(data[i].productsId)
  }
  store.dispatch({ type: "SET_COLLECTION", collection: initData })
  data = await CartModel.query()
  initData = {
    addedIds:[],
    quantityById:{}
  }
  let sum = 0
  for (let i in data){
    initData.addedIds.push(data[i].productsId)
    initData.quantityById[data[i].productsId] = data[i].num
    sum += data[i].num
  }
  console.log(initData);
  
  store.dispatch({ type: "SET_CART", data: initData, num:sum })


}

export default function App() {
  // Products.dropTable()
  initDatabase()
  // console.log(store.getState());
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="TabPage" component={TabScreen} />
            <Stack.Screen name="UserInfo" component={UserInfo} initialParams={{ setLogined: null }} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Collection" component={Collection} />
            <Stack.Screen name="GoodsDetails" component={GoodsDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}

