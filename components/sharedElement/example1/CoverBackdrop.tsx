import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COVER_HEIGHT } from './Cover';

const CoverBackdrop = () => {
    return (
        <View style={styles.container}>
            {/* <LinearGradient
                start={[0, 0.6]}
                end={[0, 1]}
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                style={{
                    flex: 1
                }}
            /> */}
        </View>
    )
}

export default CoverBackdrop

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: COVER_HEIGHT
    }
})
