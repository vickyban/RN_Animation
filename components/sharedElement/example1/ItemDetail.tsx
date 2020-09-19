import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Animated as RNAnimated } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { SharedElement } from 'react-navigation-shared-element';
import Cover, { COVER_HEIGHT } from './Cover';
import Animated, { interpolate } from 'react-native-reanimated';
import { useScrollHandler, useValue, onScrollEvent } from 'react-native-redash/lib/module/v1';
import CoverBackdrop from './CoverBackdrop';
import ProductHeader from './ProductHeader';
import Header, { HEADER_HEIGHT } from './Header';

const { width, height } = Dimensions.get('window');

const ItemDetail = () => {
    const { params: { item } } = useRoute();
    const mountedAnimation = useRef(new RNAnimated.Value(0)).current;
    const y = useValue(0);
    const onScroll = onScrollEvent({ y });

    useEffect(() => {
        RNAnimated.parallel([
            RNAnimated.timing(mountedAnimation, {
                toValue: 1,
                duration: 600,
                delay: 300,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    const translateY = mountedAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    const productHeaderOpacity = interpolate(y, {
        inputRange: [COVER_HEIGHT - HEADER_HEIGHT / 2, COVER_HEIGHT],
        outputRange: [1, 0],
    })

    return (
        <View style={styles.container}>
            <Cover item={item} y={y} />
            <RNAnimated.View style={{ flex: 1, opacity: mountedAnimation, transform: [{ translateY }] }}>
                <Animated.ScrollView
                    onScroll={onScroll}
                    scrollEventThrottle={1}
                    snapToStart={false}
                    snapToEnd={false}
                    snapToOffsets={[COVER_HEIGHT, COVER_HEIGHT + HEADER_HEIGHT]}

                >
                    <CoverBackdrop />
                    <Animated.View style={[styles.content, {
                        // borderTopLeftRadius: 20,
                        // borderTopRightRadius: 20,

                    }]}>
                        <Animated.View style={{ opacity: productHeaderOpacity }}>
                            <ProductHeader item={item} />
                        </Animated.View>
                    </Animated.View>

                    <View style={[styles.content]}>
                        <Text style={styles.contentText}>
                            This UI was suggested by one of the channel subscribers, and thought it was pretty neat and a really good one to try out the shared element transitions on. If you guys have any suggestions on any kind of UI's to create do let me know in the comments below, but nothing too crazy alright? :D
                </Text>
                    </View>
                    <View style={[styles.content]}>
                        <Text style={styles.contentText}>
                            This UI was suggested by one of the channel subscribers, and thought it was pretty neat and a really good one to try out the shared element transitions on. If you guys have any suggestions on any kind of UI's to create do let me know in the comments below, but nothing too crazy alright? :D
                </Text>
                    </View>
                    <View style={[styles.content]}>
                        <Text style={styles.contentText}>
                            This UI was suggested by one of the channel subscribers, and thought it was pretty neat and a really good one to try out the shared element transitions on. If you guys have any suggestions on any kind of UI's to create do let me know in the comments below, but nothing too crazy alright? :D
                </Text>
                    </View>
                    <View style={[styles.content]}>
                        <Text style={styles.contentText}>
                            This UI was suggested by one of the channel subscribers, and thought it was pretty neat and a really good one to try out the shared element transitions on. If you guys have any suggestions on any kind of UI's to create do let me know in the comments below, but nothing too crazy alright? :D
                </Text>
                    </View>
                    <View style={[styles.content]}>
                        <Text style={styles.contentText}>
                            This UI was suggested by one of the channel subscribers, and thought it was pretty neat and a really good one to try out the shared element transitions on. If you guys have any suggestions on any kind of UI's to create do let me know in the comments below, but nothing too crazy alright? :D
                </Text>
                    </View>
                    <View style={[styles.content]}>
                        <Text style={styles.contentText}>
                            This UI was suggested by one of the channel subscribers, and thought it was pretty neat and a really good one to try out the shared element transitions on. If you guys have any suggestions on any kind of UI's to create do let me know in the comments below, but nothing too crazy alright? :D
                </Text>
                    </View>
                </Animated.ScrollView>
            </RNAnimated.View>
            <Header y={y} />
        </View>
    )
}

export default ItemDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        paddingVertical: 20
    },
    contentText: {
        color: 'white'
    },

    profile_img: {
        width: 100,
        height: 100,
        borderRadius: 20
    },
    profile_title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    profile_subTitle: {
        color: '#fefefe',
        fontSize: 18
    }
})
