import React, { useState, useRef } from 'react';
import { StyleSheet, Image, View, FlatList, SectionList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import SwiperComponent from '../components/SwiperComponent.jsx'
import { Text, Button, Icon } from '@ui-kitten/components';
import { set } from 'react-native-reanimated';
import { connect } from "react-redux";
import CoffeeImage from '../images/Images'


let scrollLock = false
let timeout = null

const PinIcon = (props) => (
    <Icon {...props} name='pin-outline' />
);

const PlusIcon = (props) => (
    <Icon {...props} name='plus-circle' />
);
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: '人气TOP',
        active: 0
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: '大师咖啡',
        active: 1
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: '水果很好喝',
        active: 2
    },
];

let DATA2 = [
    {
        active: 0,
        title: "人气Top",
    },
    {
        active: 1,
        title: "大师咖啡",
    },
    {
        active: 2,
        title: "水果很好喝",
    }
];

const Item = ({ active, item, index, setActive, list }) => {
    let itemStyle = styles.item
    let sortTitle = styles.sortTitle
    let bubble = {}
    if (index == active) {
        itemStyle = styles.itemActive
        sortTitle = styles.sortTitleActive
        bubble = styles.bubble
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            clearTimeout(timeout)
            scrollLock = true
            setActive(item.active)
            list.current.scrollToLocation({
                itemIndex: 0,
                sectionIndex: item.active
            })
            timeout = setTimeout(()=>{scrollLock = false}, 1000)
            
        }}>
            <View style={itemStyle}>
                <View style={bubble}></View>
                <Text style={sortTitle}>{item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

function SectionItem({ item, navigation }) {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('GoodsDetails', {info:item})}>
            <View style={styles.SectionItem}>
                <View style={styles.goodsPic}>
                    <Image style={{width: "100%",height: "100%"}} source={CoffeeImage[item.id]}></Image>
                </View>
                <View>
                    <Text style={styles.goodsTitle}>{item.title}</Text>
                    <Text style={styles.goodsDetial}>{item.english}</Text>
                    <Text style={styles.goodsDetial}>{item.sort}</Text>
                    <Text style={styles.goodsPrice}>¥{item.price}</Text>
                </View>
                <View style={styles.goodsAdd}>
                    <PlusIcon fill="#657BC6" style={{ width: 20, height: 20 }}></PlusIcon>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const ShoppingList = ({navigation, products}) => {

    console.log(Object.values(products));
    
    let GoodsList = DATA2

    for (let i = 0;i<GoodsList.length;i++)
        GoodsList[i]["data"] = Object.values(products)

    const VIEWABILITY_CONFIG = {
        minimumViewTime: 300,
        viewAreaCoveragePercentThreshold: 10,
        waitForInteraction: true,
    };

    const [active, setActive] = useState(0)
    // const [scrollLock, setScrollLock] = useState(false)
    const refSectionList = useRef(null)

    const onViewChange = (obj) => {
        if (obj.viewableItems[0] != undefined && "section" in obj.viewableItems[0] && !scrollLock)
            setActive(obj.viewableItems[0].section.active)
    }

    
    return (
        <View style={styles.body}>
            <Image
                style={styles.backgroundImg}
                source={require('../images/luckin.png')}
            />
            <View style={styles.Ad}>
                <SwiperComponent showsPagination={false} type={2}></SwiperComponent>
            </View>
            <View style={styles.shop}>
                <View style={{ flexDirection: "row" }}>
                    <PinIcon style={styles.pinIcon} fill='#8E8E8E'></PinIcon>
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 2 }}>北京林业大学</Text>
                        <Text style={{ fontSize: 13, color: "#8D8D8D" }}>北京市 海淀区 清华东路15号</Text>
                    </View>
                    <View style={{ backgroundColor: "#363C91", width: 80, height: 32, borderRadius: 30, position: "absolute", right: 10, flexDirection: "column", justifyContent: "center", alignItems: "center" }}><Text style={{ color: "#fff", fontSize: 13 }}>只能自提</Text></View>
                </View>
            </View>
            <View style={styles.list}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.left}
                    data={DATA}
                    renderItem={({ item, index }) => <Item active={active} item={item} index={index} setActive={setActive} list={refSectionList} />}
                    keyExtractor={item => item.id}
                />
                <View style={styles.right}>
                    <View style={{ height: 10 }}></View>
                    <SectionList
                        ref={refSectionList}
                        showsVerticalScrollIndicator={false}
                        // stickySectionHeadersEnabled={true}
                        // style={styles.right}
                        sections={GoodsList}
                        viewabilityConfig={VIEWABILITY_CONFIG}
                        onViewableItemsChanged={onViewChange}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <SectionItem item={item} navigation={navigation} />}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.header}>{title}</Text>
                        )}
                    />
                    <View style={{ height: 10 }}></View>
                </View>

            </View>
        </View>
    );
}

const mapStateToProps = state => ({
    products: state.products.data
});

export default connect(mapStateToProps)(ShoppingList)

const styles = StyleSheet.create({
    backgroundImg: {
        width: "100%",
        height: 420,
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    body: {
        width: "100%",
        height: "100%",
    },
    Ad: {
        width: "94%",
        height: 140,
        marginLeft: "3%",
        marginTop: 50,
        borderRadius: 8,
        // backgroundColor: "#66ccff",
        overflow: 'hidden',
    },
    shop: {
        width: "94%",
        height: 70,
        marginLeft: "3%",
        marginTop: 12,
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    shopName: {

    },
    shopAddr: {

    },
    list: {
        flex: 1,
        flexDirection: 'row',
        width: "100%",
        marginBottom: 10
    },
    left: {
        // backgroundColor: "#fff",
        marginLeft: "3%",
        width: 20,
        borderRadius: 8,
        marginTop: 12,
    },
    item: {
        width: 100,
        height:18,
        marginTop: 15,
        marginBottom: 15,
    },
    itemActive: {
        // marginTop:10,
        // marginBottom:10,
        backgroundColor: "#fff",
        borderRadius: 8,
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    right: {
        backgroundColor: "#fff",
        width: "65%",
        marginLeft: 10,
        marginRight: "3%",
        borderRadius: 8,
        marginTop: 12,
    },
    header: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: 'bold',
        // marginBottom: 3,
        // marginTop: 3,
        paddingTop:3,
        paddingBottom:3,
        backgroundColor: "#fff",

    },
    SectionItem: {
        // backgroundColor: "#fff",
        flex: 1,
        flexDirection: 'row',
    },
    goodsPic: {
        backgroundColor: "#C7D0DD",
        width: 70,
        height: 70,
        borderRadius: 8,
        margin: 10,
        overflow:"hidden"
    },
    goodsTitle: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
    goodsDetial: {
        color: "#A9A9A9",
        fontSize: 10
    },
    goodsPrice: {
        color: "#CB5E2F",
        fontSize: 18,
        fontWeight: 'bold',
        position: "absolute",
        bottom: 8
    },
    goodsAdd: {
        position: 'absolute',
        width: 20,
        height: 20,
        // borderRadius: 20,
        // backgroundColor: "#657BC6",
        right: 12,
        bottom: 10
    },
    sortTitle: {
        fontSize: 17,
        marginLeft: 10,
        color: "#B3B3B3",
        fontWeight: '100'
    },
    sortTitleActive: {
        fontSize: 17,
        marginLeft: 10,
        color: "#000",
        fontWeight: 'bold'
    },
    bubble: {
        backgroundColor: "#E7E8F8",
        width: 20,
        height: 20,
        borderRadius: 20,
        position: "absolute",
        left: -10,
        top: 8
    },
    pinIcon: {
        height: 20,
        width: 20,
        marginLeft: 13,
        marginTop: 8
    }
});