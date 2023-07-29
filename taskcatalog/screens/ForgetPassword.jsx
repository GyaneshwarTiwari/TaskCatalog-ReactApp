import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../redux/action';

const ForgetPassword = ({ navigation }) => {

    const [email, setEmail] = useState("");

    const { loading } = useSelector(state => state.message)

    const dispatch = useDispatch()

    const forgetHandler = async () => {
        await dispatch(forgetPassword(email))
        navigation.navigate("resetpassword")

    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#272829",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ fontSize: 20, margin: 20, color: '#FFF6E0' }}>WELCOME</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={Styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />


            </View>

            <Button
                style={Styles.btn}
                onPress={forgetHandler}
                textColor='#FFF6E0'
                disabled={loading}
                loading={loading}
            >
                Send Email
            </Button>



        </View>
    )
}




const Styles = StyleSheet.create({

    input: {
        backgroundColor: "#D8D9DA",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },

    btn: {
        backgroundColor: "#61677A",
        padding: 5,
        width: "70%",
    },
})

export default ForgetPassword