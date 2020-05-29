import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import SwiperComponent from '../components/SwiperComponent.jsx'
import { Text, Button, Icon } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';


const LayersIcon = (props) => (
    <Icon {...props} name='layers-outline' />
);

const CubeIcon = (props) => (
    <Icon {...props} name='cube-outline' />
);

const GiftIcon = (props) => (
    <Icon {...props} name='gift-outline' />
);

const HeadphoneIcon = (props) => (
    <Icon {...props} name='headphones-outline' />
);


const LeftIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward-outline' />
);


const MyselfPage = ({ route, navigation }) => {

    const [logined, setLogined] = useState(false)

    return (
        <View style={styles.body}>
            <Image
                style={styles.backgroundImg}
                source={require('../images/luckin.png')}
            />
            {
                logined ?
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('UserInfo', {setLogined:setLogined})}>
                        <View style={styles.logined} >
                            <Image style={styles.head} source={require("../images/head.png")}></Image>
                            <Text style={styles.name}>刘唯一</Text>
                            <LeftIcon fill="#fff" style={{ height: 20, width: 20, marginLeft: 10 }}></LeftIcon>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress={() => setLogined(true)}>
                        <View style={styles.logined} >
                            <Image style={styles.head} source={require("../images/head.png")}></Image>
                            <Text style={styles.name}>点击登录</Text>
                            <LeftIcon fill="#fff" style={{ height: 20, width: 20, marginLeft: 10 }}></LeftIcon>
                        </View>
                    </TouchableWithoutFeedback>
            }
            <View style={styles.Info}>
                <View style={styles.InfoView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.num}>0</Text>
                        <Text style={styles.unit}>元</Text>
                    </View>
                    <Text style={styles.numText}>账户余额</Text>
                </View>
                <View style={styles.InfoView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.num}>0</Text>
                        <Text style={styles.unit}>张</Text>
                    </View>
                    <Text style={styles.numText}>咖啡钱包</Text>
                </View>
                <View style={styles.InfoView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.num}>0</Text>
                        <Text style={styles.unit}>张</Text>
                    </View>
                    <Text style={styles.numText}>优惠券</Text>
                </View>
                <View style={styles.InfoView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.num}>0</Text>
                        <Text style={styles.unit}>张</Text>
                    </View>
                    <Text style={styles.numText}>礼品卡</Text>
                </View>
            </View>
            <View style={styles.memu}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Order')}>
                    <View style={styles.buttonItem}>
                        <LayersIcon style={styles.buttonIcon} fill="#999"></LayersIcon>
                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                            <Text style={styles.buttonText}>我的订单</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Collection')}>
                    <View style={styles.buttonItem}>
                        <CubeIcon style={styles.buttonIcon} fill="#999"></CubeIcon>
                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                            <Text style={styles.buttonText}>我的收藏</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.buttonItem}>
                    <GiftIcon style={styles.buttonIcon} fill="#999"></GiftIcon>
                    <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Text style={styles.buttonText}>兑换优惠</Text>
                    </View>
                </View>
                <View style={styles.buttonItem}>
                    <HeadphoneIcon style={styles.buttonIcon} fill="#999"></HeadphoneIcon>
                    <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Text style={styles.buttonText}>我的客服</Text>
                    </View>
                </View>
                <View style={{ height: 8 }}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImg: {
        width: "100%",
        height: 290,
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    body: {
        width: "100%",
        height: "100%",
    },
    Info: {
        width: "94%",
        height: 90,
        marginLeft: "3%",
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    memu: {
        width: "94%",
        // height: 250,
        marginLeft: "3%",
        marginTop: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    InfoView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    num: {
        color: "#3E449C",
        fontSize: 19,

    },
    unit: {
        color: "#3E449C",
        fontSize: 12,
        marginLeft: 3,
        marginTop: 7
    },
    numText: {
        color: "#888888",
        fontSize: 12,
        marginTop: 8
    },
    buttonItem: {
        flexDirection: 'row',
        alignContent: "center"
    },
    buttonIcon: {
        width: 26,
        height: 26,
        marginLeft: 20,
        margin: 15
    },
    buttonText: {
        fontSize: 16,
        color: "#888",
        marginLeft: 3
    },
    logined: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 55
    },
    head: {
        width: 60,
        height: 60,
        marginLeft: 25
    },
    name: {
        fontSize: 24,
        color: "#fff",
        marginLeft: 12
    }

});

export default MyselfPage;