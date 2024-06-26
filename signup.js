import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, TextInput } from "react-native";
import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';
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
        color: '#717171',
        fontSize: 16,
        fontFamily: 'Rubik-Black',
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
        width: '30%',
        fontSize: 16,
        fontFamily: 'Rubik-Bold',
    },
    logoutButton: {
        width: '95%',
        height: 60,
        backgroundColor: '#000000',
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Rubik-Black',
        color: '#ffffff'
    },
    cancelButtonText: {
        color: '#787878',
        fontSize: 16,
        fontFamily: 'Rubik-Regular',
        textDecorationLine: 'underline',
        margin: 10
    },
    input: {
        height: 70,
        width: '100%',
        margin: 12,
        padding: 10,
        color: '#5E5E5E',
        fontFamily: 'Rubik-LightItalic',
        textAlign: "right",
    },
    errorMessage: {
        fontSize: 12,
        color: "red",
        fontFamily: 'Rubik-LightItalic',
        textAlign: "right",
        marginRight: '10%',
    }
})

const App = () => {
    const navigation = useNavigation();

    const [validateFirstname, setValidateFirstName] = useState(false);
    const [validateLastname, setValidateLastname] = useState(false);
    const [validatePassword, setValidatePassword] = useState(false);
    const [validateEmailAddress, setValidateEmail] = useState(false);
    const [validateSchool, setValidateSchool] = useState(false);
    const [validateYear, setValidateYear] = useState(true);

    const [totalValidation, setTotalValidation] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [Password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [year, setYear] = useState('');

    const [tokenGenerated, setTokenGenerated] = useState('');

    const submit = () => {
        if (
            validateNameRegex(firstname) &&
            validateNameRegex(lastname) &&
            validatePasswordRegex(Password) &&
            validateEmailRegex(email) &&
            validateNameRegex(school)
        ) {
            console.log('Submit');
            register();
        } else {
            console.log('not submit');
        }
    }

    const storageSave = async (data) => {
        await AsyncStorage.setItem(
            'loginToken', data.token,
        );
    }

    const register = () => {

        var data = {
            firstname: firstname,
            lastname: lastname,
            password: Password,
            email: email,
            school: school,
            year: year,
        }

        fetch("http://13.210.52.39:3000/register", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var newData = {
                    email: email,
                    password: Password
                }

                try {
                    fetch("http://13.210.52.39:3000/login", {
                        method: "POST",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newData)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (newData) {
                        setTokenGenerated(newData.token);
                        console.log(data);
                        storageSave(newData);
                        navigation.dispatch(
                            StackActions.replace('Profile')
                        );
                    }).then(function () {
                        navigation.dispatch(
                            StackActions.replace('Profile')
                        );
                    });
                } catch (error) {
                    console.log(error);
                    alert(error);
                }
            });
    }

    const validateNameRegex = (name) => {
        var re = /^[a-zA-Z ]{1,30}$/;
        if (re.test(name) == false) {
            if (name == firstname) {
                setValidateFirstName(true);
            } else {
                if (name == lastname) {
                    setValidateLastname(true);
                } else {
                    setValidateSchool(true);
                }
            }
        } else {
            if (name == firstname) {
                setValidateFirstName(false);
                return re.test(name);
            } else {
                if (name == lastname) {
                    setValidateLastname(false);
                    return re.test(name);
                } else {
                    setValidateSchool(false);
                    return re.test(name);
                }
            }
        }
    }

    const validateEmailRegex = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email) == false) {
            setValidateEmail(true);
            return re.test(email);
        } else {
            setValidateEmail(false);
            return re.test(email);
        }
    }

    const validatePasswordRegex = (password) => {
        var re = /^.{6,30}$/;
        if (re.test(password) == false) {
            setValidatePassword(true);
            return re.test(password);
        } else {
            setValidatePassword(false);
            return re.test(password);
        }
    }

    // validateYearRegex = (year) => {
    //     // 1950 - 2050
    //     var re = /^19[5-9]\d|20[0-4]\d|2050$/;
    //     return re.test(year);
    // }

    return (
        <View style={styles.wholeScreen}>

            <View style={styles.header}>
                <Text style={styles.headerText}>
                    CREATE YOUR ACCOUNT
                </Text>
            </View>

            <ScrollView style={{ width: '100%' }}>
                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>First name</Text>
                    <View style={styles.infoDetailText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFirstname}
                            placeholder="John"
                            keyboardType="default"
                        />
                    </View>
                </View>
                {validateFirstname == true ?
                    (
                        <Text style={styles.errorMessage}>
                            Invalid First name
                        </Text>
                    ) : null
                }

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>Last name</Text>
                    <View style={styles.infoDetailText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setLastname}
                            placeholder="Smith"
                            keyboardType="default"
                        />
                    </View>
                </View>
                {validateLastname == true ?
                    (
                        <Text style={styles.errorMessage}>
                            Invalid Last name
                        </Text>
                    ) : null
                }

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>Password</Text>
                    <View style={styles.infoDetailText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="Minimum 6 characters"
                            keyboardType="default"
                        />
                    </View>
                </View>
                {validatePassword == true ?
                    (
                        <Text style={styles.errorMessage}>
                            Invalid Password
                        </Text>
                    ) : null
                }

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>Email</Text>
                    <View style={styles.infoDetailText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            placeholder="Exmaple: John@email.com"
                            keyboardType="email-address"
                        />
                    </View>
                </View>
                {validateEmailAddress == true ?
                    (
                        <Text style={styles.errorMessage}>
                            Invalid Email address
                        </Text>
                    ) : null
                }

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>School</Text>
                    <View style={styles.infoDetailText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSchool}
                            placeholder="Where do you study?"
                            keyboardType="default"
                        />
                    </View>
                </View>
                {validateSchool == true ?
                    (
                        <Text style={styles.errorMessage}>
                            Invalid School name
                        </Text>
                    ) : null
                }

                <View style={styles.infoCards}>
                    <Text style={styles.infoDetailTextLabel}>What year?</Text>
                    <View style={styles.infoDetailText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setYear}
                            placeholder="Batch"
                            keyboardType="number-pad"
                        />
                    </View>
                </View>
                {/* {validateYear == true ?
                    (
                        <Text style={styles.errorMessage}>
                            Invalid year
                        </Text>
                    ) : null
                } */}

                <View style={{ height: 50 }}></View>

            </ScrollView>

            <TouchableHighlight style={styles.logoutButton} onPress={() => { submit(); }}>
                <Text style={styles.buttonText}>
                    SAVE AND SUBMIT
                </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.cencelButton} onPress={() => navigation.dispatch(
                StackActions.replace('Login')
            )}>
                <Text style={styles.cancelButtonText}>
                    Cancel
                </Text>
            </TouchableHighlight>

        </View>
    );
};

export default App;
