import React, { useRef, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, FlatList } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useHeaderHeight } from '@react-navigation/stack';
import { Transition, Transitioning } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.68;

const items = [
    { id: '1', title: 'Seilwared', img: require('@assets/unsplash/img1.jpg'), color: '#0C212D' },
    { id: '2', title: 'Seilwared', img: require('@assets/unsplash/img2.jpg'), color: '#F8EACE' },
    { id: '3', title: 'Seilwared', img: require('@assets/unsplash/img3.jpg'), color: '#E4E5EA' }
]

const trasition = (
    <Transition.In
        delayMs={500}
        interpolation='easeInOut'
        type='fade'
        durationMs={500}
        propagation='left'
    />
)

const ItemDetail = () => {
    const { params: { item } } = useRoute();
    const headerHeight = useHeaderHeight();
    const animation = useRef();

    useLayoutEffect(() => {
        if (animation.current) {
            animation.current.animateNextTransition()
        }
    }, [animation])

    return (
        <View style={styles.container}>
            <SharedElement id={`item.${item.id}.photo`} style={[StyleSheet.absoluteFillObject, { opacity: 0.8 }]}>
                <Image
                    source={item.img}
                    style={{
                        width: '100%',
                        height: '100%',
                    }} resizeMode='cover' />
            </SharedElement >
            <SafeAreaView style={{
                flex: 1,
                paddingTop: headerHeight
            }}>
                <SharedElement id={`item.${item.id}.location`}>
                    <Text style={[styles.location]}>{item.title}</Text>
                </SharedElement>

                <Transitioning.View
                    ref={animation}
                    transition={trasition}
                    style={{ flex: 1 }}>
                    <FlatList
                        horizontal
                        data={items}
                        style={styles.items}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Image source={item.img} style={styles.itemPic} />
                            </View>)}
                    />
                </Transitioning.View>
            </SafeAreaView>
        </View >
    )
}

export default ItemDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    location: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        width: ITEM_WIDTH * 0.8,
        textTransform: 'uppercase',
        position: 'absolute',
        top: 50,
        left: 12,
    },
    items: {
        flexGrow: 0,
        position: 'absolute',
        bottom: 10,
        // backgroundColor: 'red'
    },
    item: {
        width: 200,
        height: 200,
        margin: 12,
        padding: 6,
        backgroundColor: '#f3f3f3'
    },
    itemPic: {
        width: '100%',
        height: '80%'
    }
})
