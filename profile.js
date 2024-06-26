import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, StackActions } from '@react-navigation/native';

import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
    wholeScreen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#f5f5f5',
    },
    header: {
        margin: 10,
        width: '95%',
        height: 70,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    headerText: {
        color: '#123F2E',
        fontSize: 16,
        fontFamily: 'Rubik-Black',
    },
    iconBack: {
        width: 25,
        borderRadius: 50,
        backgroundColor: '#373737',
        position: "absolute",
        marginTop: 145,
        marginLeft: 145,
    },
    infoCards: {
        margin: 10,
        width: '95%',
        height: 70,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    infoDetailText: {
        flexDirection: "row-reverse",
        width: '70%',
        alignItems: "center",
    },
    infoDetailTextLabel: {
        fontSize: 16,
        fontFamily: 'Rubik-Bold',
    },
    infoDetailTextData: {
        marginHorizontal: 15,
        fontSize: 16,
        fontFamily: 'Rubik-Light',
    },
    scoreBackground: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#30D291',
        justifyContent: "center",
        alignItems: "center"
    },
    logoutButton: {
        width: '95%',
        height: 60,
        backgroundColor: '#73CBD2',
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Rubik-Black',
        color: '#ffffff'
    },
})

const App = () => {
    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getUserDetails = (res) => {
        try {
            fetch("http://13.210.52.39:3000/getuserdetail", {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Parser ${res}`
                },
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                setData(data.data);
            });
        } catch (error) {
            console.error('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    const getUser = async () => {
        try {
            let token = await AsyncStorage.getItem('loginToken');
            getUserDetails(token);
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        console.log('Logged Out');
        await AsyncStorage.removeItem('loginToken');
        navigation.dispatch(
            StackActions.replace('Login')
        );

    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <View style={styles.wholeScreen}>

            <View style={styles.header}>
                <Text style={styles.headerText}>
                    YOUR PROFILE
                </Text>
            </View>

            <ScrollView style={{ width: '100%' }}>
                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>Name</Text>
                    <View style={styles.infoDetailText}>
                        <Icon size={16} name={'pencil'} color={'#000000'} />
                        <Text style={styles.infoDetailTextData}>{data.firstname} {data.lastname}</Text>
                    </View>
                </View>

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>Past Scores</Text>
                    <View style={styles.infoDetailText}>
                        <View style={{ flexDirection: "row", width: '80%', justifyContent: "space-between" }}>
                            <View style={styles.scoreBackground}>
                                <Text style={styles.infoDetailTextData}>
                                    {data.id}
                                </Text>
                            </View>

                            <View style={styles.scoreBackground}>
                                <Text style={styles.infoDetailTextData}>
                                    {data.id}
                                </Text>
                            </View>

                            <View style={styles.scoreBackground}>
                                <Text style={styles.infoDetailTextData}>
                                    {data.id}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>School</Text>
                    <View style={styles.infoDetailText}>
                        <Icon size={16} name={'pencil'} color={'#000000'} />
                        <Text style={styles.infoDetailTextData}>{data.school}</Text>
                    </View>
                </View>

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>What year?</Text>
                    <View style={styles.infoDetailText}>
                        <Icon size={16} name={'pencil'} color={'#000000'} />
                        <Text style={styles.infoDetailTextData}>{data.year}</Text>
                    </View>
                </View>

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>Email</Text>
                    <View style={styles.infoDetailText}>
                        <Icon size={16} name={'pencil'} color={'#000000'} />
                        <Text style={styles.infoDetailTextData}>{data.email}</Text>
                    </View>
                </View>

            </ScrollView>

            <TouchableHighlight style={styles.logoutButton} onPress={() => { logout(); }}>
                <Text style={styles.buttonText}>
                    LOGOUT
                </Text>
            </TouchableHighlight>

        </View>
    );
};

export default App;
