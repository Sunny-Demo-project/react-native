import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, StackActions } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#F6F6F6',
        flex: 1,
    },
    heading: {
        fontSize: 16,
        fontFamily: 'Rubik-Black',
        color: '#717171',
        marginVertical: 15,
    },
    input: {
        height: 50,
        width: '90%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#30D291',
        borderRadius: 25,
        paddingHorizontal: 25,
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: 'Rubik-Bold',
        textAlign: "left",
        marginLeft: 20,
        marginTop: 20,
        width: '90%'
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
        width: '90%',
        height: 60,
        backgroundColor: '#30D291',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Rubik-Black',

    },
    inputText1: {
        fontSize: 16,
        paddingTop: 15,
        fontFamily: 'Rubik-Regular',
    },
    inputText2: {
        fontSize: 16,
        paddingTop: 5,
        color: '#006600',
        fontFamily: 'Rubik-Regular',
        textDecorationLine: 'underline',
        paddingBottom: 10,
    },
})

const AppLogin = () => {
    const navigation = useNavigation();

    const [Password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [tokenGenerated, setTokenGenerated] = useState('');

    const storageSave = async (data) => {
        try {
            await AsyncStorage.setItem(
                'loginToken', data.token,
            );
        } catch (error) {
            console.log(error);
        }
    }

    submit = () => {
        // console.log('------------------------------Submit Pressed-------------------------');
        var data = {
            email: email,
            password: Password
        }

        if (data.email == '' || data.password == '') {
            alert('Invalid Input');
        } else {
            try {
                fetch("http://13.210.52.39:3000/login", {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    setTokenGenerated(data.token);
                    // console.log(data);
                    storageSave(data);
                    // navigation.dispatch(
                    //     StackActions.replace('Profile')
                    // );
                }).then(function () {
                    navigation.dispatch(
                        StackActions.replace('Profile')
                    );
                });
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }
    }

    return (
        <ScrollView style={styles.body}>
            <View style={{ alignItems: "center" }}>

                <View style={{ backgroundColor: '#ffffff', width: '90%', height: 70, alignItems: "center", justifyContent: "center", marginBottom: 15, }}>
                    <Text style={styles.heading}>LOG IN TO YOUR ACCOUNT</Text>
                </View>

                <Image source={require('../../assets/images/login.png')}
                    style={styles.loginImage} />

                <Text style={styles.inputLabel}>Username</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    placeholder="Username or Email"
                    keyboardType="email-address"
                />

                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder="Type password"
                    secureTextEntry={true}
                    keyboardType="default"
                />

                <View style={{ flexDirection: "row", marginLeft: '5%', width: '90%', marginTop: 5 }}>
                    <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 15 }}>Forgot password? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                        <Text style={{
                            textDecorationLine: 'underline'
                        }}>Click here</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => { submit(); }}>
                    <Text style={styles.buttonText}>
                        SIGN IN
                    </Text>
                </TouchableOpacity>

                <Text style={styles.inputText1}>Don't have an account yet?</Text>

                <TouchableOpacity
                    onPress={() => navigation.dispatch(
                        StackActions.replace('SignUp')
                    )}
                >
                    <Text style={styles.inputText2}>Sign up now</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

export default AppLogin;