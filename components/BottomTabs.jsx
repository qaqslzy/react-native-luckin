import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Text } from '@ui-kitten/components';
import { connect } from "react-redux";

const HomeIcon = (props) => (
    <Icon {...props} name='home-outline' />
);

const BellIcon = (props) => (
    <Icon {...props} name='bell-outline' />
);

const ShoppingCartIcon = (props) => (
    <Icon {...props} name='shopping-cart-outline' />
);

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline' />
);

function ShoppingCartIconWithBadge(props) {
    let badgeCount = props.badgeCount
    return (
        <View>
            <ShoppingCartIcon {...props}></ShoppingCartIcon>
            {badgeCount > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}


const AppBottomNavigation = ({ navigation, state, store, count }) => {


    const CartWithBadge = () => {
        return (props) => {
            return <ShoppingCartIconWithBadge {...props} badgeCount={count} />;
        }
    }

    // store.subscribe(() => setBadgeNum(store.getState()))


    return (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}
            appearance="noIndicator">
            <BottomNavigationTab title='首页' icon={HomeIcon} />
            <BottomNavigationTab title='菜单' icon={BellIcon} />
            <BottomNavigationTab title='购物车' icon={CartWithBadge()} />
            <BottomNavigationTab title='我的' icon={PersonIcon} />
        </BottomNavigation>
    );
};

const styles = StyleSheet.create({
    bottomNavigation: {
        position: 'absolute',
        bottom: 0
    },
});

const mapStateToProps = state => ({
    count: state.count
});

export default connect(mapStateToProps)(AppBottomNavigation)
