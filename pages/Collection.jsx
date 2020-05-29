import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import SwiperComponent from '../components/SwiperComponent.jsx'
import { Text, Button, Icon } from '@ui-kitten/components';
import { connect } from "react-redux";

const BackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back-outline' />
);

const Item = ({ item, navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => { navigation.navigate('GoodsDetails', { info: item }) }}>
            <View style={{ flexDirection: "row", margin: 10, marginLeft: 15 }}>
                <View style={{ height: 60, width: 60, backgroundColor: "#66ccff", borderRadius: 8 }}></View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 5, marginTop: 5 }}>{item.title}</Text>
                    <Text style={{ fontSize: 14, }} appearance='hint'>{item.sort}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const Collection = ({ navigation, collection, products }) => {
    let collectionData = []

    for (let i in collection) {
        collectionData.push(products[collection[i]])
    }
    
    let ListItems = collectionData.map((item) =>
        <Item item={item} key={item.id} navigation={navigation} ></Item>
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 40, width: "100%" }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{ position: "absolute", left: 10, marginTop: -3 }}>
                        <BackIcon fill="#000" style={{ width: 30, height: 30 }}></BackIcon>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: 20, }}>我的收藏</Text>
            </View>
            {
                collectionData.length > 0 &&
                <View style={{ marginTop: 20, width: "94%", marginLeft: "3%", backgroundColor: "#fff", borderRadius: 8 }}>
                    <View style={{ height: 10 }}></View>

                    {ListItems}

                    <View style={{ height: 10 }}></View>
                </View>
            }
        </ScrollView>
    )
}


const mapStateToProps = state => ({
    collection: state.collection,
    products: state.products.data
});

export default connect(mapStateToProps)(Collection)