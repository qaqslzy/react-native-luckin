import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import Swiper from 'react-native-swiper'

export const Dot = () => {
    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6, borderRadius: 4, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: 4, }} />
    )
}

export const ActiveDot = () => {
    return (
        <View style={{ backgroundColor: '#363C91', width: 6, height: 6, borderRadius: 4, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: 4, }} />
    )
}

export default function SwiperComponent(props) {

    return (
        <Swiper {...props} autoplay={true} paginationStyle={styles.pagination}
            dot={<Dot></Dot>}
            activeDot={<ActiveDot></ActiveDot>}>
            <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
            </View>
        </Swiper>
    )
}


const styles = StyleSheet.create({
    pagination: {
        bottom: 15
    },
    slide1: {
        flex: 1,
        // height:150,
        // width:80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',

    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',

    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',

    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});