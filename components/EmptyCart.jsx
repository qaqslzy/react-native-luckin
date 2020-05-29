import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import SwiperComponent from '../components/SwiperComponent.jsx'
import { Text, Button } from '@ui-kitten/components';

const EmptyCart = ({navigation}) => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image
                style={styles.picImg}
                source={require('../images/undraw_gone_shopping_vwmc.png')}
            />
            <Text
                style={styles.ShoopingText}
                appearance='hint'>您的购物车有点寂寞</Text>
            <Button
                size="medium"
                style={styles.buy}
                onPress={()=>navigation.navigate('ShoppingList')}
            >
                <Text style={styles.buyText} >去喝一杯</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    picImg: {
        width: 160,
        height: 170,
        marginTop: 70
    },
    buy: {
        marginTop: 30,
        width: 160,
        borderRadius: 100,
    },
    buyText: {
        color: "#fff",
        fontSize: 15.5
    },
    ShoopingText: {
        marginTop: 20,
        fontSize: 14
    }
});

export default EmptyCart;