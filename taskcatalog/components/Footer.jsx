import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native"

const Footer = () => {

    const navigation = useNavigation()
    return (
        <View
            style={{
                padding: 30,
                backgroundColor: "#272829",
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
                <Icon name="home" size={30} color="#FFF6E0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                <Icon name="user" size={30} color="#FFF6E0" />
            </TouchableOpacity>
        </View>
    )
}

export default Footer