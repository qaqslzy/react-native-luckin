import React, { useState, useRef } from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import SwiperComponent from '../components/SwiperComponent.jsx'
import { Text, Button, Icon } from '@ui-kitten/components';
import { connect } from "react-redux";
import CollectionModel from '../model/collection'
import CartModel from '../model/cart'
import CoffeeImage from '../images/Images'
const BackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back-outline' />
);

const PlusIcon = (props) => (
    <Icon {...props} name='plus-circle' />
);

const MinusIcon = (props) => (
    <Icon {...props} name='minus-circle-outline' />
);

const CloseIcon = (props) => (
    <Icon {...props} name='close-outline' />
);

const HeartOutlineIcon = (props) => (
    <Icon {...props} name='heart-outline' />
);

const HeartIcon = (props) => (
    <Icon {...props} name='heart' />
);

const GoodsDetails = ({ navigation, route, dispatch, collection }) => {

    const info = route.params.info
    const [goodsNum, setGoodsNum] = useState(1)
    const [isFavorite, setIsFavorite] = useState(collection.indexOf(info.id) !== -1)
    console.log(info);
    
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <View style={{
                width: 30, height: 30, borderRadius: 25, backgroundColor: "rgba(00,00,00,0.6)", position: "absolute", top: 40, left: 15, zIndex: 100,
                justifyContent: "center", alignItems: "center"
            }}>
                <TouchableWithoutFeedback onPress={async () => {
                    if (isFavorite) {
                        let co = await CollectionModel.findBy({ productsId_eq: info.id })
                        await co.destroy()
                    } else {
                        const props = {
                            productsId: info.id,
                        }
                        const co = new CollectionModel(props)
                        await co.save()
                    }
                    setIsFavorite(!isFavorite);
                    dispatch({ type: "ADD_TO_COLLECTION", productId: info.id })
                }
                }>
                    {
                        isFavorite ?
                            <HeartIcon fill="#fff" style={{ width: 17, height: 17 }}></HeartIcon>
                            :
                            <HeartOutlineIcon fill="#fff" style={{ width: 17, height: 17 }}></HeartOutlineIcon>
                    }
                </TouchableWithoutFeedback>

            </View>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: "rgba(00,00,00,0.6)", position: "absolute", top: 40, right: 15, zIndex: 100, justifyContent: "center", alignItems: "center" }}>
                    <CloseIcon fill="#fff" style={{ width: 20, height: 20 }}></CloseIcon>
                </View>
            </TouchableWithoutFeedback>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
                <View style={{ width: "100%", backgroundColor: "#888", height: 300 }}>
                    <Image style={{height:"100%", width:"100%"}} source={CoffeeImage[info.id]}></Image>
                </View>
                <View style={{ width: "94%", marginLeft: "3%", marginTop: 15, backgroundColor: "#fff", borderRadius: 8 }}>
                    <Text style={{ marginLeft: 15, marginTop: 10, fontSize: 18 }}>{info.title}</Text>
                    <Text appearance='hint' style={{ fontSize: 13, marginLeft: 15, marginTop: 3, marginBottom: 10, marginRight: 15 }}>
                        {info.english}
                    </Text>
                </View>
                <View style={{ width: "94%", marginLeft: "3%", marginTop: 10, backgroundColor: "#fff", borderRadius: 8 }}>
                    <Text style={{ marginLeft: 15, marginTop: 10, fontSize: 16 }}>商品详情</Text>
                    <Text appearance='hint' style={{ fontSize: 13, marginLeft: 17, marginTop: 10, marginBottom: 15, marginRight: 15 }}>
                        {info.details}
                    </Text>
                </View>
                <View style={{ height: 150 }}></View>
            </ScrollView>
            <View style={{ position: "absolute", bottom: 0, width: "100%", height: 125, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                        <Text style={{ fontSize: 20, color: "#CB5E2F", fontWeight: "bold" }}>¥{info.price}</Text>
                        <Text appearance='hint' style={{ fontSize: 13 }}>{info.title}+{info.sort}</Text>
                    </View>
                    <View style={{ flexDirection: "row", position: "absolute", right: 15, bottom: 0 }}>
                        <TouchableWithoutFeedback onPress={() => { if (goodsNum > 1) setGoodsNum(goodsNum - 1) }}>
                            <MinusIcon fill="#657BC6" style={{ width: 25, height: 25 }} />
                        </TouchableWithoutFeedback>
                        <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 20, fontWeight: "bold" }}>{goodsNum}</Text>
                        <TouchableWithoutFeedback onPress={() => setGoodsNum(goodsNum + 1)}>
                            <PlusIcon fill="#657BC6" style={{ width: 25, height: 25 }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Button style={{ width: "90%", marginLeft: "5%", marginTop: 15, borderRadius: 100 }}
                    onPress={async () => {
                        let co = await CartModel.findBy({ productsId_eq: info.id })
                        if (co != null){
                            co.num += goodsNum
                            await co.save() 
                        }else {
                            const props = {
                                productsId: info.id,
                                num: goodsNum
                            }
                            co = new CartModel(props)
                            await co.save()
                        }
                        dispatch({ type: "ADD_TO_CART", productId: info.id, productNum: goodsNum })
                        navigation.goBack()
                    }}>加入购物车</Button>
            </View>
        </View>
    )
}


const mapStateToProps = state => ({
    collection: state.collection,

});

export default connect(mapStateToProps)(GoodsDetails)
