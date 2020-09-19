import React, { useRef, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import { SharedElement } from 'react-navigation-shared-element';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Transitioning, Transition } from 'react-native-reanimated';

const items = [
    { id: '1', title: 'Seilwared', img: require('@assets/unsplash/img1.jpg'), color: '#0C212D' },
    { id: '2', title: 'Seilwared', img: require('@assets/unsplash/img2.jpg'), color: '#F8EACE' },
    { id: '3', title: 'Seilwared', img: require('@assets/unsplash/img3.jpg'), color: '#E4E5EA' },
    { id: '4', title: 'Seilwared', img: require('@assets/unsplash/img4.jpg'), color: '#0C212D' },
    { id: '5', title: 'Seilwared', img: require('@assets/unsplash/img5.jpg'), color: '#0C212D' },
]

const { width, height } = Dimensions.get('window');
const IMG_WIDTH = width;
const IMG_HEIGHT = IMG_WIDTH * 0.5;
const CARD_CONTENT_WIDTH = width * 0.8;
const CARD_CONTENT_HEIGHT = width * 0.5

const transition = <Transition.In
    delayMs={200}
    durationMs={400}
    interpolation='easeOut'
    type={'slide-bottom'}
    propagation='top' />

const Item = () => {
    const headerHeight = useHeaderHeight();
    const { params: { item } } = useRoute()
    const animation = useRef();

    useLayoutEffect(() => {
        if (animation.current)
            animation.current.animateNextTransition()
    }, [animation])
    return (
        <View style={{
            flex: 1,
            paddingTop: headerHeight,
            backgroundColor: '#f3f3f3'
        }}>
            <SharedElement id={`item.${item.id}.photo`} style={[StyleSheet.absoluteFillObject]}>
                <Image source={item.img} style={styles.img} />
            </SharedElement>

            <SharedElement id={`item.${item.id}.location`} style={{
                alignSelf: 'center'
            }}>
                <View style={styles.cardContent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SharedElement id={`item.${item.id}.avatar`}>
                            <Image source={item.img} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        </SharedElement>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
                            <Text style={{ fontSize: 16 }}>Developer</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>120</Text>
                            <Text>Album</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>120</Text>
                            <Text>Followers</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>120</Text>
                            <Text>Following</Text>
                        </View>
                    </View>
                </View>
            </SharedElement>

            <Transitioning.View ref={animation} transition={transition} style={{ flex: 1 }}>
                <FlatList
                    data={items}
                    numColumns={2}
                    style={{ marginTop: 10 }}
                    renderItem={({ item: data }) => (
                        <View style={styles.item}>
                            <Image source={data.img} style={{ flex: 1, width: undefined, height: undefined }} />
                        </View>
                    )}
                />
            </Transitioning.View>
        </View>
    )
}

export default Item

const styles = StyleSheet.create({
    img: {
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        backgroundColor: 'black',
    },
    cardContent: {
        width: CARD_CONTENT_WIDTH,
        height: CARD_CONTENT_HEIGHT,
        backgroundColor: 'white',
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    item: {
        flex: 0.5,
        height: 150,
        padding: 6,
        margin: 6,
        backgroundColor: 'white'

    }
})
