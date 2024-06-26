import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { AsyncStorage } from 'react-native';
import DropDown from '../../widgets/dropdown';
import axios from 'axios';

const Atarcalculator = () => {
    const [listLength, setListLength] = React.useState(1);
    const [atarScore, setAtarScore] = React.useState('00.00');
    const [subjects, setSubjects] = useState([]);
    const [dataToSend, setDataToSend] = useState([]);
    const [scaledScore, setScaledScore] = useState('');
    const [email, setEmail] = useState();

    const handleState = (e) => {
        setAtarScore(e);
        console.log(atarScore);
    };

    console.log(scaledScore);

    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => {
            formData.append('mysubjects[]', object[key].subject);
            formData.append('raw[]', object[key].raw);
        });
        return formData;
    }

    useEffect(async () => {
        if (subjects.raw > 50) {

        }
        else {
            console.log('subjects', subjects);
            // create form and attach all subcject
            var subjectsList = await getFormData(subjects);
            console.log(subjects);
            console.log('new', subjectsList);
            var response = await axios.post(
                "https://calculator.studentgarden.com/site/vceatarresult",
                // pass that subject here
                subjectsList,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            )
            response = response.data;
            console.log(response);
            var temp = response.subject_results[(response.subject_results.length) - 1].scaled;
            temp = Math.round(temp);
            temp = temp.toString();
            setScaledScore(temp);
            setAtarScore(response.atar);
            setDataToSend(response);
        }
    }, [subjects])

    const handleSubjects = ({ subject, raw }) => {
        // update based on subject
        setSubjects([...subjects, { subject, raw }]);
    }

    var dropdownlist = [];

    for (let i = 1; i < listLength; i++) {
        dropdownlist.push(
            <DropDown
                handleSubjects={(e) => handleSubjects(e)}
                handleState
            // style={styles.dropdownSingle}
            />
        )
    }

    function listLengthIncrement() {
        let temp = listLength;
        temp++;
        setListLength(temp);
    }

    const saveScore = async () => {
        try {
            var token = '-';
            token = await AsyncStorage.getItem('loginToken');
            console.log(token);
            if (token != '-' && token != '' && token != null) {
                sendAtarToDatabase(token);
            }
            else {
                Alert.alert(
                    "SCORE NOT SAVED",
                    "Your Score cannot be saved. Make sure you are logged in.",
                    [
                        { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        } catch (error) {
            Alert.alert(
                "SCORE NOT SAVED",
                "Something Went Wrong. ERROR - ", error,
                [
                    { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    function getTodayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }

    function sendAtarToDatabase(token) {
        console.log('dataToSend', dataToSend);
        console.log(dataToSend.subject_results);
        console.log(Object.keys(dataToSend.subject_results).length);
        if (dataToSend.atar == "N/A" || dataToSend.atar == null || dataToSend.atar == undefined) {
            Alert.alert(
                "SCORE CANNOT BE SAVED",
                "Atleast 4 subjects should be there.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        } else {

            try {
                fetch("http://13.210.52.39:3000/getuserdetail", {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Parser ${token}`
                    },
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    setEmail(data.data.email);
                    console.log('email', email);
                }).then(function () {
                    var atarData = {
                        email: email,
                        date: getTodayDate(),
                        subjects: JSON.stringify(dataToSend.subject_results),
                        atar: dataToSend.atar,
                    }

                    console.log(atarData);

                    try {
                        fetch("http://13.210.52.39:3000/addatar", {
                            method: "POST",
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(atarData)
                        }).then(function (response) {
                            console.log(response);
                        })
                    } catch (error) {
                        console.log(error);
                        alert(error);
                    }
                });
            } catch (error) {
                console.error('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
                console.error(error);
            }

            Alert.alert(
                "Score Saved",
                "Your Score ",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("Score Saved")
                    }
                ]
            );
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#F1F1F1', marginTop: 15 }}>
            <View style={styles.atarHeader}>
                <Text style={styles.atarHeaderText}>YOUR ATAR RANK</Text>
                <Text style={styles.atarHeaderRank}>{atarScore}</Text>
            </View>

            <ScrollView style={styles.atarBody}>
                <View style={styles.atarBodyInner}>
                    <Text style={styles.atarBodyInnerHead}>
                        To see your ATAR rank, add at least four subjects and their raw scores, including English.
                    </Text>

                    <View
                        style={{
                            width: '95%',
                            borderBottomColor: '#979797',
                            borderBottomWidth: 1,
                        }}
                    />

                    <View style={styles.dropdownInput}>
                        <View style={styles.dropdownHeader}></View>

                        <View style={styles.inputTextHeader}>
                            <Text style={styles.labelTextHeader}>RAW</Text>
                        </View>

                        <View style={styles.inputTextHeader}>
                            <Text style={styles.labelTextHeader}>SCALED</Text>
                        </View>
                    </View>

                    <DropDown
                        handleSubjects={(e) => handleSubjects(e)}
                        position={1}
                        scaledScore={scaledScore}
                    />

                    <DropDown
                        handleSubjects={(e) => handleSubjects(e)}
                        position={2}
                        scaledScore={scaledScore}
                    />

                    <DropDown
                        handleSubjects={(e) => handleSubjects(e)}
                        position={3}
                        scaledScore={scaledScore}
                    />

                    <DropDown
                        handleSubjects={(e) => handleSubjects(e)}
                        position={4}
                        scaledScore={scaledScore}
                    />

                    {/* <View style={styles.dropdown}>
                        {dropdownlist}
                    </View> */}

                    <View style={styles.newSubject}>
                        <TextInput
                            placeholder="Add a new subject"
                            keyboardType="default"
                            style={styles.newSubjectAdd}
                        />
                        <TouchableOpacity onPress={() => { listLengthIncrement() }}>
                            <Image source={require("../../assets/images/add_button.png")}
                                style={styles.addButton} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >

            <View style={styles.buttonDisplay}>
                <TouchableOpacity style={styles.bottomButtonStart}
                    onPress={() => { saveScore(); }}>
                    <Text style={styles.buttonText}>
                        SAVE SCORE
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    atarHeader: {
        width: '90%',
        height: 130,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: '#30D291',
        borderWidth: 1,
        borderColor: '#EDEDED',
        borderRadius: 5,
        shadowColor: '#000000',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 4,
        }
    },
    atarHeaderText: {
        fontSize: 17,
        fontFamily: 'Rubik-Black',
        color: '#ffffff',
    },
    atarHeaderRank: {
        fontSize: 60,
        fontFamily: 'Rubik-Black',
        color: '#ffffff',
    },
    atarBody: {
        marginVertical: 15,
        width: '90%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#EDEDED',
        borderRadius: 5,
        shadowColor: '#000000',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 4,
        }
    },
    atarBodyInner: {
        alignItems: "center",
        justifyContent: "center",
    },
    atarBodyInnerHead: {
        fontSize: 14,
        fontFamily: 'Rubik-Bold',
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        marginHorizontal: 5,
    },
    dropdownHeader: {
        height: 50,
        width: '50%',
    },
    inputTextHeader: {
        alignItems: "center",
        justifyContent: "center",
        width: '20%',
    },
    labelTextHeader: {
        fontSize: 14,
    },
    dropdownInput: {
        width: '95%',
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dropdown: {

    },
    // dropdownSingle: {
    //     margin: 10,
    // },
    newSubject: {
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 50,
        width: '95%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, .25)',
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    newSubjectAdd: {
        width: '80%',
    },
    addButton: {
        height: 30,
        width: 30
    },
    buttonDisplay: {
        width: '90%',
        height: 70,
        flexDirection: 'row',
        paddingBottom: 15,
    },
    bottomButtonStart: {
        width: '100%',
        height: '100%',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: "bold",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderRadius: 25,
        backgroundColor: '#000000',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Rubik-Black',
    },
})

export default Atarcalculator;
