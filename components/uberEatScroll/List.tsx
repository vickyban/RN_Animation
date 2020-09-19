import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Animated, FlatList, TouchableOpacity, Image } from 'react-native'

const AnimatedList = Animated.createAnimatedComponent<FlatList<any>>(FlatList);

const data = [
    { id: 1, title: 'Picked for You', img: require('@assets/images/img1.png') },
    { id: 2, title: 'Chicken', img: require('@assets/images/img2.png') },
    { id: 3, title: 'Soup', img: require('@assets/images/img3.png') },
    { id: 2, title: 'Sides', img: require('@assets/images/img2.png') },
    { id: 3, title: 'Beverages', img: require('@assets/images/img3.png') },
]

const List = () => {
    const [measuments, setMeasurements] = useState<any[]>([]);
    const [contents] = useState(data);
    const scroll = useRef<FlatList>();
    const y = useRef(new Animated.Value(0)).current;
    const activeIndex = useRef(new Animated.Value(0)).current;
    const activeIndexAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(activeIndexAnimation, {
            toValue: activeIndex,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, []);

    useEffect(() => {
        if (measuments.length < data.length) return;

        y.addListener(v => {
            const curTab = measuments.find((tab, index) => {
                if (index === measuments.length - 1 && v >= tab.anchor) return true;
                return v >= tab.anchor && v <= measuments[index + 1].anchor
            });
            // activeIndex.setValue(curTab.index);
        })

        return () => y.removeAllListeners();
    }, [measuments]);

    const translateX = activeIndexAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [50, 0, -50]
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.View style={[styles.topics, { transform: [{ translateX }] }]}>
                {/* {
                    measuments.length == data.length && measuments.map(({ title, index }) => {
                        return (
                            <Animated.View key={title} >
                                <TouchableOpacity style={styles.topic} onPress={() => { }}>
                                    <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )
                    })
                } */}
            </Animated.View>
            <AnimatedList
                ref={scroll}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { y } }
                    }
                ], { useNativeDriver: true })}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                data={contents}
                keyExtractor={item => item.title}
                // renderItem={({ item }) => (
                //     <View
                //         style={styles.content}
                //     >
                //         <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                //         <View style={styles.content_img}>
                //             <Image source={item.img} style={{ flex: 1, height: null, width: null }} />
                //         </View>
                //     </View>
                // )}
                CellRendererComponent={({ item, index }) => (
                    <View
                        onLayout={event => {
                            const { y: anchor } = event.nativeEvent.layout
                            setMeasurements(prev => {
                                let cur = [...prev];
                                cur[index] = { anchor: anchor - 5, index, title: item.title }
                                return cur
                            })
                        }}
                        style={styles.content}
                    >
                        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                        <View style={styles.content_img}>
                            <Image source={item.img} style={{ flex: 1, height: null, width: null }} />
                        </View>
                    </View>

                )}
                style={styles.contents}
            />
        </SafeAreaView>
    )
}

export default List

const styles = StyleSheet.create({
    topics: {
        flexDirection: 'row',
        flexGrow: 0,
        marginVertical: 10,
        paddingVertical: 10
    },
    topic: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f3f3f3',
        marginHorizontal: 5
    },
    contents: {
        flex: 1
    },
    content: {
        padding: 10,
        backgroundColor: '#f3f3f3',
        marginVertical: 5
    },
    content_img: {
        height: 200,
        width: 200,
        marginVertical: 10
    }
})
