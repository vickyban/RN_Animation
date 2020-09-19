import React, { useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Animated, Platform } from 'react-native'
import { useScrollHandler } from 'react-native-redash/lib/module/v1';
import Card, { ACTUAL_CARD_WIDTH, CARD_WIDTH, CARD_HEIGHT } from './Card';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const images = [
    { id: 1, img: require('@assets/images/img1.png') },
    { id: 2, img: require('@assets/images/img2.png') },
    { id: 3, img: require('@assets/images/img3.png') },
    { id: 4, img: require('@assets/images/img1.png') },
    { id: 5, img: require('@assets/images/img2.png') },
    { id: 6, img: require('@assets/images/img3.png') },
]

const color = [
    'red',
    'blue',
    'yellow',
    'green',
    'pink',
    'purple'
]

const index = () => {
    const x = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event([{
        nativeEvent: { contentOffset: { x } }
    }], { useNativeDriver: true })
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Trending</Text>
            <AnimatedFlatList
                horizontal
                data={images}
                style={styles.scroll}
                contentContainerStyle={{ paddingRight: ACTUAL_CARD_WIDTH * 1.5 }}
                keyExtractor={item => `${item.id}`}
                decelerationRate={'fast'}
                snapToInterval={ACTUAL_CARD_WIDTH}
                renderItem={({ item, index }) => <Card {...{ item, index, x }} />}
                scrollEventThrottle={16}
                onScroll={onScroll}
                CellRendererComponent={({ index, style, ...props }) => (
                    <View
                        style={[style, {
                            zIndex: images.length - index,
                            elevation: 5,
                            overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
                        }]}
                        {...props}
                        index={index}
                    />)
                }
            />
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: 'white'
    },
    scroll: {
        marginTop: 20,
        marginLeft: 20,
        flexGrow: 0
    }
})
