import React from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@ui-kitten/components';
import SwiperComponent from '../components/SwiperComponent.jsx'
import { ScrollView } from 'react-native-gesture-handler';

export default function IndexPage({ navigation }) {
    return (
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <Image
                style={styles.backgroundImg}
                source={require('../images/luckin.png')}
            />
            <View style={styles.wrapper}>
                <SwiperComponent></SwiperComponent>
            </View>
            <View style={styles.panel}>
                <View style={styles.line1}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ShoppingList')}>
                        <View style={{ height: 100, width: "63%", marginTop: 10, marginLeft: 10, borderTopLeftRadius: 8, overflow: "hidden" }}>
                            <Image style={{ height: 100, width: "100%" }} source={require("../images/order.png")} resizeMode="stretch"></Image>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.block}>
                        <View style={{ height: 47.5, width: "100%", marginTop: 5, marginLeft: 5, borderTopRightRadius: 8, overflow: "hidden" }}>
                            <Image style={{ height: 47.5, width: "100%" }} source={require("../images/b1.png")}></Image>
                        </View>
                        <View style={{ height: 47.5, width: "100%", marginTop: 5, marginLeft: 5 }}>
                            <Image style={{ height: 47.5, width: "100%" }} source={require("../images/b2.png")}></Image>
                        </View>
                    </View>
                </View>
                <View style={{ height: 100, width: "94.5%", marginTop: 5, marginLeft: 10, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, overflow: "hidden" }}>
                    <Image style={{ height: 100, width: "100%" }} source={require("../images/b3.png")}></Image>
                </View>
            </View>
            <View style={{ marginLeft: "4%", marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>新鲜事</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ backgroundColor: "#fff", height: 180, width: 280, marginTop: 5, marginLeft: 10, borderRadius: 5, overflow: "hidden" }}>
                    <Image style={{ height: 180, width: "100%" }} source={require("../images/ad1.png")} resizeMode="stretch"></Image>
                </View>
                <View style={{ backgroundColor: "#fff", height: 180, width: 280, marginTop: 5, marginLeft: 10, borderRadius: 5, overflow: "hidden" }}>
                    <Image style={{ height: 180, width: "100%" }} source={require("../images/ad2.png")} resizeMode="stretch"></Image>
                </View>
                <View style={{ height: 180, width: "3%", marginTop: 10, marginLeft: 10, borderRadius: 8 }}></View>

            </ScrollView>
            <View style={{ height: 10 }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    backgroundImg: {
        width: "100%",
        height: 510,
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    wrapper: {
        width: "94%",
        height: 200,
        marginLeft: "3%",
        marginTop: 40,
        borderRadius: 10,
        overflow: 'hidden',
    },
    body: {
        width: "100%",
        height: "100%"
    },
    panel: {
        width: "94%",
        marginLeft: "3%",
        marginTop: 12,
        borderRadius: 10,
        height: 228,
        backgroundColor: "#fff"
    },
    line1: {
        flexDirection: "row"
    },
    block: {
        flexDirection: "column",
        width: "30%",
        marginTop: 5
    },
    line2: {
        alignItems: 'stretch',
        flexDirection: "row"
    }
});