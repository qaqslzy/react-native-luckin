import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
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
    let photos = [require("../images/photo1.png"), require("../images/photo2.png"), require("../images/photo3.png")]
    if (props.type == 2) {
        photos = [require("../images/photo4.png"), require("../images/photo5.png"), require("../images/photo6.png")]
    }

    return (
        <Swiper {...props} autoplay={true} paginationStyle={styles.pagination}
            dot={<Dot></Dot>}
            activeDot={<ActiveDot></ActiveDot>}>
            <View style={styles.slide1}>
                <Image style={styles.img} source={photos[0]} resizeMode="stretch"></Image>
                {/* <Text style={styles.text}>Hello Swiper</Text> */}
            </View>
            <View style={styles.slide2}>
                <Image style={styles.img} source={photos[1]} resizeMode="stretch"></Image>
            </View>
            <View style={styles.slide3}>
                <Image style={styles.img} source={photos[2]} resizeMode="stretch"></Image>
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
    img: {
        width: "100%",
        height: "100%",
        // resizeMode:""
        // overflow:"visible"
    }
});