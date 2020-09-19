import React, { useRef } from 'react'
import { StyleSheet, Text, View, FlatList, Animated, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useHeaderHeight } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';

const AFlatList = Animated.createAnimatedComponent(FlatList);

const items = [
    { id: 1, title: 'Seilwared', img: require('@assets/unsplash/img1.jpg'), color: '#0C212D' },
    { id: 2, title: 'Seilwared', img: require('@assets/unsplash/img2.jpg'), color: '#F8EACE' },
    { id: 3, title: 'Seilwared', img: require('@assets/unsplash/img3.jpg'), color: '#E4E5EA' },
    { id: 4, title: 'Seilwared', img: require('@assets/unsplash/img4.jpg'), color: '#0C212D' },
    { id: 5, title: 'Seilwared', img: require('@assets/unsplash/img5.jpg'), color: '#0C212D' },
]

const { width } = Dimensions.get('window');


const ITEM_WIDTH = width * 0.68;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const SPACING = 12;
const FULL_SIZE = ITEM_WIDTH + 2 * SPACING;

interface ItemProps {
    x: Animated.Value;
    item: { id: number, img: number, title: string };
    index: number;
}
const Item = ({ item, index, x }: ItemProps) => {
    const navigation = useNavigation();
    const opacity = x.interpolate({
        inputRange: [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE],
        outputRange: [0, 1, 0]
    })
    const locationTranslateX = x.interpolate({
        inputRange: [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE],
        outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH]
    })
    const dateTranslateX = x.interpolate({
        inputRange: [(index - 0.5) * FULL_SIZE, index * FULL_SIZE, (index + 0.5) * FULL_SIZE],
        outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH]
    })
    const scale = x.interpolate({
        inputRange: [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE],
        outputRange: [1, 1.1, 1]
    })
    return (
        <TouchableOpacity
            onPress={() => navigation.push('Item', { item })}
            style={styles.itemContainer}>
            <SharedElement id={`item.${item.id}.photo`} style={StyleSheet.absoluteFillObject}>
                <Animated.Image
                    source={item.img}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        width: undefined,
                        height: undefined,
                        transform: [{ scale }]
                    }} resizeMode='cover' />
            </SharedElement>
            <Animated.View style={{ opacity }}>
                <BlurView style={{ padding: SPACING }} intensity={80} tint='dark'>
                    <SharedElement id={`item.${item.id}.location`}>
                        <Animated.Text style={[styles.location, { transform: [{ translateX: locationTranslateX }] }]}>{item.title}</Animated.Text>
                    </SharedElement>
                    <Animated.Text style={[styles.date, { transform: [{ translateX: dateTranslateX }] }]}>{item.title}</Animated.Text>
                </BlurView>
            </Animated.View>
        </TouchableOpacity>
    )
}


const List = () => {
    const headerHeight = useHeaderHeight();
    const x = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x } } }], { useNativeDriver: true })
    return (
        <SafeAreaView style={[styles.container, { paddingTop: headerHeight }]}>
            <Text style={styles.listTitle}>Trips</Text>
            <AFlatList
                horizontal
                snapToInterval={FULL_SIZE}
                decelerationRate='fast'
                scrollEventThrottle={1}
                onScroll={onScroll}
                data={items}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{ paddingRight: FULL_SIZE }}
                renderItem={({ item, index }) => <Item item={item} index={index} x={x} />}
            />
        </SafeAreaView>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    itemContainer: {
        position: 'relative',
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: SPACING,
        borderRadius: 20,
        overflow: 'hidden'
    },
    location: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        width: ITEM_WIDTH * 0.8,
        textTransform: 'uppercase',
    },
    date: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        width: ITEM_WIDTH * 0.8,
    }
})
