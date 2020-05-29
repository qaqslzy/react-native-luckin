import React from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback } from 'react-native';
import SwiperComponent from '../components/SwiperComponent.jsx'
import { Text, Button, Icon } from '@ui-kitten/components';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back-outline' />
);

const Order = ({navigation}) => {
    return (
        <View style={{ width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 40, width: "100%" }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{ position: "absolute", left: 10, marginTop: -3 }}>
                        <BackIcon fill="#000" style={{ width: 30, height: 30 }}></BackIcon>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: 20, }}>我的订单</Text>
            </View>
            <View>
                
            </View>
        </View>
    )
}

export default Order;