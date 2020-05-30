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
    details:"经典拿铁与焦糖风味融于一杯,炭烤香气自然醇厚,加入滑效布丁,入口层次丰富,是香浓悠长的法式风情。\n主要原材料:浓缩咖啡、纯牛奶、布丁、焦糖风味糖浆、搅打奶油(含香草风味糖浆)、焦糖调味酱。\n图片仅供参考,请以实物为准,建议取餐后尽快饮用。",
    sort: "大/默认奶油/半糖/冰",
  },
  {
    title: "陨石拿铁",
    english: "Brown Sugar BoBo Latte",
    price: "16.8",
    details:"【探月50年主题推荐款】独特的黑糖风味拿铁,佐以香滑Q嫩的黑糖口味寒天晶球,创造出层次丰富的美妙口感,一起碰撞咖啡宇宙的无限可能。\n本产品不含任何陨石成分,请放心饮用,建议搅拌后饮用。\n主要原材料:浓缩啦啡、黑糖味寒天晶球、牛奶、黑糖调味糖浆、原味调味糖浆、可选择添加搅打奶油(含香草风味糖浆)\n本产品仅供冷饮,图片仅供参考,请以实物为准。寒天晶球切勿一口吞食,儿童禁食。",
    sort: "大/默认奶油/半糖/热",
  },
  {
    title: "浮云朵朵瑞纳冰",
    english: "Classic Vanilla Flavored Exfreezo",
    price: "18",
    details:"经典的香草风味瑞纳冰,纯牛奶的加入让口感更加柔和细最后点缀上甜蜜焦糖酱,倍感香甜冰爽。\n主要原料:纯牛奶、香草风味糖浆、焦糖风味糖酱、原味冰沙粉、冰块、稀奶油(含香草风味糖浆)。\n图片仅供参考,请以实物为准。建议送达后尽快饮用。到店饮用口感更佳",
    sort: "大/默认奶油/冰",
  },
  {
    title: "楽岛桃桃冰",
    english: "Peach & Rose Exfreezo",
    price: "18",
    details:"【网易云音乐主题推荐款】蜜桃和玫瑰的灵感碰撞,清甜桃桃香气隐藏在玫瑰花香下,加上绵密细腻的沙冰 topping,桃香、花香和清甜奶油,仿佛音符在你的舌尖上开 party!\n主要原材料:桃汁饮料浓浆,玫瑰风味糖浆,冰块。\n图片仅供参考,请以实物为准。水果风味瑞纳冰会出现分层现象,建议送达后尽快饮用。",
    sort: "大/默认奶油/冰",
  },
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
  // ProductsModel.dropTable()
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

