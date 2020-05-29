import React from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import SwiperComponent from '../components/SwiperComponent.jsx'
import EmptyCart from '../components/EmptyCart'
import { Text, Button, Icon } from '@ui-kitten/components';
import { connect } from "react-redux";
import CartModel from '../model/cart'

const PlusIcon = (props) => (
    <Icon {...props} name='plus-circle' />
);

const MinusIcon = (props) => (
    <Icon {...props} name='minus-circle-outline' />
);


function Item({ item, dispatch }) {
    return (
        <View style={styles.itemStyle}>
            <View style={styles.goodsPic}></View>
            <View style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
                <Text style={{ fontSize: 13, }} appearance='hint'>{item.sort}</Text>
                <Text style={{ position: "absolute", bottom: 0, fontSize: 16, fontWeight: "bold" }}>¥{(parseFloat(item.price) * item.num).toFixed(1)}</Text>
            </View>
            <View style={{ flexDirection: "row", position: "absolute", right: 15, bottom: 0 }}>
                <TouchableWithoutFeedback onPress={async () => {
                    let co = await CartModel.findBy({ productsId_eq: item.id })
                    co.num -= 1
                    if(co.num <= 0){
                        await co.destroy()
                    }else{
                        await co.save()
                    }
                    dispatch({ type: "REMOVE_TO_CART", productId: item.id })
                }}>
                    <MinusIcon fill="#657BC6" style={{ width: 20, height: 20 }} />
                </TouchableWithoutFeedback>
                <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 17, fontWeight: "bold" }}>{item.num}</Text>
                <TouchableWithoutFeedback onPress={async () => {
                    let co = await CartModel.findBy({ productsId_eq: item.id })
                    co.num += 1
                    await co.save()
                    dispatch({ type: "ADD_TO_CART", productId: item.id })
                }}>
                    <PlusIcon fill="#657BC6" style={{ width: 20, height: 20 }} />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}


const ShoppingCart = ({ dispatch, cart, products, navigation }) => {

    let cartData = []
    let sum = 0
    console.log(cart);

    for (let i in cart.addedIds) {
        id = cart.addedIds[i]
        let tmp = products[id]
        tmp["num"] = cart.quantityById[id]
        sum += parseFloat(tmp.price) * tmp.num
        cartData.push(
            tmp
        )
    }

    const ListItems = cartData.map((item) =>
        <Item item={item} key={item.id} dispatch={dispatch}></Item>
    );



    return (
        <View>
            {
                cart.addedIds.length > 0 ?
                    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                        <Image
                            style={styles.backgroundImg}
                            source={require('../images/luckin.png')}
                        />
                        <View style={styles.cart}>
                            <View style={{ margin: 15 }}>
                                <Text style={{ fontSize: 14, color: "#888" }}>饮品与小食订单</Text>
                            </View>
                            <View style={{ width: "90%", height: 0.8, backgroundColor: "#eee", marginLeft: "5%", marginBottom: 10 }}></View>
                            {ListItems}
                            <View style={{ width: "90%", height: 0.8, backgroundColor: "#eee", marginLeft: "5%", marginTop: 10 }}></View>
                            <View style={{ flexDirection: "row", alignItems: "center", height: 70, marginTop: 5 }}>
                                <View style={{ marginLeft: 18, marginTop: -5, flexDirection: "row" }}>
                                    <Text style={{ fontSize: 16 }}>应付合计 </Text>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>¥{sum.toFixed(1)}</Text>
                                </View>
                                <Button style={{ position: "absolute", right: 10, borderRadius: 100, width: 90 }} onPress={async () => {
                                    await CartModel.destroyAll()
                                    dispatch({ type: 'CHECKOUT_REQUEST' })
                                }}>去结算</Button>
                            </View>
                        </View>
                    </ScrollView>

                    :
                    <View style={styles.bodyEmpty} showsVerticalScrollIndicator={false}>
                        <Image
                            style={styles.backgroundImgEmpty}
                            source={require('../images/luckin.png')}
                        />
                        <EmptyCart navigation={navigation} />
                    </View>
            }
        </View>
    );
}

const mapStateToProps = state => ({
    cart: state.cart,
    products: state.products.data
});

export default connect(mapStateToProps)(ShoppingCart)

const styles = StyleSheet.create({
    backgroundImg: {
        width: "100%",
        height: 120,
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    backgroundImgEmpty: {
        width: "100%",
        height: 150,
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    bodyEmpty: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        width: "100%",
        height: "100%",
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    itemStyle: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        height: 58
    },
    itemTextViewStyle: {
        flexDirection: "column"
    },
    goodsPic: {
        width: 55,
        height: 55,
        borderRadius: 8,
        backgroundColor: "#666"
    },
    cart: {
        width: "94%",
        margin: "3%",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginTop: 50
    }

});
