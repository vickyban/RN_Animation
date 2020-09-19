import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('HoldAndDragScreen')} style={{ padding: 10, backgroundColor: 'pink' }}>
                <Text>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
