import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout, updateProfile } from '../redux/action'
import mime from "mime"
import Loader from '../components/Loader'

const Profile = ({ navigation, route }) => {

    const { user, loading } = useSelector(state => state.auth)


    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState(user.avatar.url);


    const dispatch = useDispatch()

    const submitHandler = async () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("avatar", {
            uri: avatar,
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        })
        await dispatch(updateProfile(myForm));
        dispatch(loadUser())
    }

    const handleImage = () => {
        navigation.navigate("camera", {
            updateProfile: true
        })
    };

    const logoutHandler = () => {
        dispatch(logout())
    }


    useEffect(() => {
        if (route.params) {
            if (route.params.image) {
                setAvatar(route.params.image)
            }
        }

    }, [route])

    return (
        loading ? <Loader /> : (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#272829",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Avatar.Image
                    size={100}
                    source={{ uri: avatar ? avatar : null }}
                    style={{ backgroundColor: "#D8D9DA" }}
                />
                <TouchableOpacity onPress={handleImage}>
                    <Text style={{ color: "#FFF6E0", margin: 20 }}>Change Photo</Text>
                </TouchableOpacity>

                <View style={{ width: "70%" }}>
                    <TextInput
                        style={Styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />

                </View>

                <Button
                    style={Styles.btn}
                    onPress={submitHandler}
                >
                    <Text style={{ color: "#fff" }}>Update</Text>
                </Button>

                <Button
                    textColor='#D8D9DA'
                    onPress={() => navigation.navigate("changepassword")}
                >
                    Change Password
                </Button>

                <Button
                    textColor='#D8D9DA'
                    onPress={logoutHandler}
                >
                    Logout
                </Button>

                {
                    user.verified ? null : <Button
                        textColor='#D8D9DA'
                        onPress={() => navigation.navigate("verify")}
                    >
                        Verify
                    </Button>
                }


            </View>
        )
    )
}

export default Profile

const Styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
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
});