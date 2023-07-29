import { View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Loader = () => {
    return (
        <View
            style={{
                backgroundColor: "#272829",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator animating={true} size={100} color="#D8D9DA" />
        </View>
    )
}

export default Loader