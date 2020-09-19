import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'


const ProductHeader = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image source={item.img} style={styles.hero} />
            <View style={styles.right}>
                <Text style={styles.title}>Sky: Children of the Light</Text>
                <Text style={styles.subTitle}>Fly with Friends</Text>
                <View style={styles.btnRow}>
                    <View style={styles.getBtn}>
                        <Text style={styles.getBtn_text}>Get</Text>
                    </View>
                    <Text style={styles.btnSubText}>In-App Purchases</Text>
                </View>
            </View>
        </View>
    )
}

export default ProductHeader

const HERO_SIZE = 100;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
    },
    hero: {
        width: HERO_SIZE,
        height: HERO_SIZE,
        borderRadius: 20,
        marginRight: 20
    },
    right: {
        flex: 1,
        marginRight: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5
    },
    subTitle: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 5
    },
    btnRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    getBtn: {
        alignSelf: 'flex-start',
        backgroundColor: '#0071e3',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginRight: 5
    },
    getBtn_text: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    btnSubText: {
        fontSize: 12,
        color: 'gray'
    }
})
