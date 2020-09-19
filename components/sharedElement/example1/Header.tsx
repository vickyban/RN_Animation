import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';
import { COVER_HEIGHT } from './Cover';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const HEADER_HEIGHT = 80;
interface HeaderProps {
    y: Animated.Node<number>
}
const Header = ({ y }: HeaderProps) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const opacity = interpolate(y, {
        inputRange: [COVER_HEIGHT - HEADER_HEIGHT, COVER_HEIGHT],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP
    });
    const textTranslateY = interpolate(y, {
        inputRange: [COVER_HEIGHT - HEADER_HEIGHT, COVER_HEIGHT],
        outputRange: [COVER_HEIGHT - HEADER_HEIGHT / 2, 0],
        extrapolate: Extrapolate.CLAMP
    });
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Animated.View style={[StyleSheet.absoluteFillObject, { opacity }]} >
                <BlurView intensity={100} tint='dark' style={StyleSheet.absoluteFillObject} />
            </Animated.View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={styles.left}>
                    <Text style={[styles.textIcon, { color: 'black' }]}>
                        <Icon name='chevron-left' style={styles.icon} />
                    </Text>
                    <Animated.View style={[StyleSheet.absoluteFill, styles.left, { opacity }]}>
                        <Text style={[styles.textIcon, { color: 'white' }]}>
                            <Icon name='chevron-left' style={styles.icon} />
                        </Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <Animated.View style={{ flex: 1, opacity, transform: [{ translateY: textTranslateY }] }}>
                <Text style={styles.title}>Sky: Children of the Light</Text>
            </Animated.View>
            <View>
                <Text style={[styles.textIcon, { color: 'black' }]}>
                    <Icon name='heart-o' style={styles.rightTextIcon} />
                </Text>
                <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
                    <Text style={[styles.textIcon, { color: 'white' }]}>
                        <Icon name='heart-o' style={styles.rightTextIcon} />
                    </Text>
                </Animated.View>
            </View>
        </View >
    )
}

export default Header

const ICON_SIZE = 28;
const ICON_RATIO = 0.7
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        overflow: 'hidden'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    left: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textIcon: {
        // backgroundColor: 'yellow',
        // width: ICON_SIZE * ICON_RATIO,
        // height: ICON_SIZE * ICON_RATIO,
        textAlign: 'center'
    },
    icon: {
        fontSize: ICON_SIZE * ICON_RATIO,
        width: ICON_SIZE * ICON_RATIO,
        height: ICON_SIZE * ICON_RATIO,
    },
    rightTextIcon: {
        fontSize: 24
    }
})
