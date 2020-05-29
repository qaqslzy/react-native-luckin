import React from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback, BackHandler } from 'react-native';
import SwiperComponent from '../components/SwiperComponent.jsx'
import { Text, Button, Icon } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';


const BackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back-outline' />
);

const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward-outline' />
);

const SettingItem = ({ title, component, height }) => {
    let s = { flexDirection: "row", marginBottom: 10, }
    if (height != undefined && height > 0) {
        s["height"] = height
    }
    return (
        <View style={s}>
            <View style={{ flexDirection: "column", justifyContent: "center", width: "100%" }}>
                <Text style={{ fontSize: 16, color: "#888", marginLeft: 20, marginTop: 20, }}>{title}</Text>
                <View style={{ position: "absolute", right: 10, top: 20, flexDirection: "row", alignItems: "center" }}>
                    {component}
                    <ForwardIcon fill="#ddd" style={{ width: 20, height: 20 }}></ForwardIcon>
                </View>
            </View>
        </View>
    )
}

const SettingText = (text) => (<Text style={{ marginRight: 10, fontSize: 16 }}>{text}</Text>)

const SettingImg = (src) => (<Image style={{ marginRight: 10, width: 50, height: 50 }} source={src} />)


const UserInfo = ({ route, navigation }) => {
    const { setLogined } = route.params
    return (
        <View style={{ width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 40, width: "100%" }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{ position: "absolute", left: 10, marginTop: -3 }}>
                        <BackIcon fill="#000" style={{ width: 30, height: 30 }}></BackIcon>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: 20, }}>个人资料</Text>
            </View>
            <View style={styles.infoStyle}>
                <SettingItem title="头像" component={SettingImg(require("../images/headGray.png"))} height={65}></SettingItem>
                <SettingItem title="用户名" component={SettingText("刘唯一")}></SettingItem>
                <SettingItem title="性别" component={SettingText("男")}></SettingItem>
                <SettingItem title="绑定手机" component={SettingText("+86 155****0619")}></SettingItem>
                <SettingItem title="收货地址" component={SettingText("")}></SettingItem>
                <SettingItem title="帐号管理" component={SettingText("")}></SettingItem>
                <View style={{ height: 15 }}></View>
            </View>
            <View style={styles.settingStyle}>
                <SettingItem title="多语言" component={SettingText("简体中文")}></SettingItem>
                <SettingItem title="推送通知" component={SettingText("已开启")}></SettingItem>
                <View style={{ height: 10 }}></View>
            </View>
            <Button style={{ borderRadius: 100, width: "92%", marginLeft: "4%", marginTop: 20 }}
                onPress={() => {
                    if(setLogined){
                        setLogined(false)
                        navigation.goBack()
                    }
                }}>退出登录</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    infoStyle: {
        // height: 300,
        width: "94%",
        marginLeft: "3%",
        borderRadius: 8,
        marginTop: 30,
        backgroundColor: "#fff"
    },
    settingStyle: {
        // height: 150,
        width: "94%",
        marginLeft: "3%",
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: "#fff"
    }
})

export default UserInfo;