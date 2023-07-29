import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Task from "../components/Task"
import Icon from "react-native-vector-icons/Entypo"
import { Dialog, Button } from "react-native-paper"
import { useDispatch, useSelector } from 'react-redux'
import { addTask, loadUser } from '../redux/action'

const Home = ({ navigation }) => {

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const { loading, message, error } = useSelector(state => state.message)


    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const hideDialog = () => {
        setOpenDialog(!openDialog)
    }

    const addTaskHandler = async () => {
        await dispatch(addTask(title, description));
        dispatch(loadUser());
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch({ type: "clearError" });
            dispatch({ type: "clearError" });
        }
        if (message) {
            alert(message)
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, message, dispatch])



    return (

        <>
            <View style={{ backgroundColor: "#272829", flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>

                <ScrollView>
                    <SafeAreaView>
                        <Text style={styles.heading}>All Tasks</Text>

                        {user && user.tasks.map((item) => (
                            <Task key={item._id} title={item.title} description={item.description} status={item.completed} taskId={item._id} />
                        ))}
                    </SafeAreaView>
                </ScrollView>
                <TouchableOpacity style={styles.addBtn} onPress={hideDialog}>

                    <Icon name='add-to-list' size={20} color="#61677A" />


                </TouchableOpacity>
            </View>
            <Dialog visible={openDialog} onDismiss={hideDialog} >
                <Dialog.Title>ADD A TASK</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={hideDialog} >
                            <Text>CANCEL</Text>
                        </TouchableOpacity>
                        <Button
                            onPress={addTaskHandler}
                            disabled={!title || !description || loading}
                        >
                            ADD
                        </Button>
                    </View>
                </Dialog.Content>
            </Dialog>

        </>
    )
}

export default Home

const styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 25,
        marginBottom: 20,
        color: "#FFF6E0"
    },
    addBtn: {
        backgroundColor: "#FFF6E0",
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        alignSelf: "center",
        position: "absolute",
        top: 700,
        right: 20
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    }
})