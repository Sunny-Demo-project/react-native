import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ImageBackground,
    Alert
} from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { AsyncStorage } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const Atarcalculator = () => {
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [pauseStopwatch, setPauseStopwatch] = useState(false);
    const [timeSubmitted, setTimeSubmitted] = useState(false);

    const [bgColor, setBgColor] = useState('#F6F6F6');
    const [bgImage, setBgImage] = useState(null);

    const [selectedSubject, setSelectedSubject] = useState();
    const [displaySubject, setDisplaySubject] = useState();
    const [currentTime, setCurrentTime] = useState();

    const [email, setEmail] = useState();

    async function submitTrackedData(emojiFeedback) {
        console.log('Current time -------------- ' + currentTime);

        try {
            let token = '-';
            token = await AsyncStorage.getItem('loginToken');
            if (token != '-' && token != '' && token != null) {
                Alert.alert(
                    "TIME SAVED",
                    "Your Time is Saved.",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("Score Saved")
                        }
                    ]
                );

                sendTime(emojiFeedback);
            }
            else {
                Alert.alert(
                    "TIME NOT SAVED",
                    "Your Time cannot be saved. Make sure you are logged in.",
                    [
                        { text: "Cancel", onPress: () => resetEveryThing() },
                        { text: "OK", onPress: () => resetEveryThing() }
                    ]
                );
            }
        } catch (error) {
            Alert.alert(
                "TIME NOT SAVED",
                "Your Time cannot be saved. Make sure you are logged in.",
                [
                    { text: "Cancel", onPress: () => resetEveryThing() },
                    { text: "OK", onPress: () => resetEveryThing() }
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

    async function sendTime(emojiFeedback) {
        try {
            var token = await AsyncStorage.getItem('loginToken');
            console.log(token);
        } catch (error) {
            console.log(error);
        }

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
                console.log(email);
            }).then(function () {

                var trackedData = {
                    email: email,
                    time: currentTime,
                    subject: selectedSubject,
                    feedback: emojiFeedback,
                    date: getTodayDate(),
                }

                console.log(trackedData);

                try {
                    fetch("http://13.210.52.39:3000/savetime", {
                        method: "POST",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(trackedData)
                    }).then(function (response) {
                        console.log(response);
                    }).then(resetEveryThing())
                } catch (error) {
                    console.log(error);
                    alert(error);
                }
            });
        } catch (error) {
            console.error('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
            console.error(error);
        }
    }

    function resetEveryThing() {
        setBgImage(null);
        setIsTimerStart(false);
        setIsStopwatchStart(false);
        setResetTimer(false);
        setResetStopwatch(true);
        setPauseStopwatch(false);
        setTimeSubmitted(false);
        setBgColor('#F6F6F6');
        setSelectedSubject(null);
    }

    function trackingStart() {
        setBgColor('#30D291');
        setBgImage(require('../../assets/images/timetracker_bg_oct.png'));
    }

    function trackingPause() {
        setBgColor('#F6F6F6');
        setBgImage(require('../../assets/images/timetrack_pause_bg.png'));
    }

    function trackingStop() {
        setBgColor('#F6F6F6');
        setBgImage(require('../../assets/images/timetracker_submit.png'));
    }

    function getFormattedTime(time) {
        setCurrentTime(time);
    }


    const data = [
        { value: 'AC', label: 'Accounting' },
        { value: 'AH', label: 'Agricultural Horticultural Studies' },
        { value: 'AL03', label: 'Algorithmics (HESS)' },
        { value: 'HI17', label: 'Ancient History' },
        { value: 'AR', label: 'Arabic' },
        { value: 'AM', label: 'Armenian' },
        { value: 'AT', label: 'Art' },
        { value: 'AU', label: 'Auslan' },
        { value: 'HA', label: 'Australian History' },
        { value: 'PS03', label: 'Australian Politics' },
        { value: 'BI', label: 'Biology' },
        { value: 'LO50', label: 'Bosnian' },
        { value: 'BM', label: 'Business Management' },
        { value: 'CH', label: 'Chemistry' },
        { value: 'LO53', label: 'Chin Hakha' },
        { value: 'CN', label: 'Chinese First Language' },
        { value: 'LO57', label: 'Chinese Language Culture and Society' },
        { value: 'CL', label: 'Chinese Second Language' },
        { value: 'CK', label: 'Chinese Second Language Advanced' },
        { value: 'AG', label: 'Classical Greek' },
        { value: 'LO51', label: 'Classical Hebrew' },
        { value: 'CC', label: 'Classical Studies' },
        { value: 'CR', label: 'Croatian' },
        { value: 'DA', label: 'Dance' },
        { value: 'DR', label: 'Drama' },
        { value: 'DU', label: 'Dutch' },
        { value: 'EC', label: 'Economics' },
        { value: 'EN', label: 'English' },
        { value: 'EF', label: 'English (EAL)' },
        { value: 'EG', label: 'English Language' },
        { value: 'EV', label: 'Environmental Science' },
        { value: 'XI03', label: 'Extended Investigation' },
        { value: 'FP', label: 'Filipino' },
        { value: 'FT', label: 'Food Studies' },
        { value: 'FR', label: 'French' },
        { value: 'NF', label: 'Further Mathematics' },
        { value: 'GE', label: 'Geography' },
        { value: 'GN', label: 'German' },
        { value: 'PS05', label: 'Global Politics' },
        { value: 'MG', label: 'Greek' },
        { value: 'HH', label: 'Health and Human Development' },
        { value: 'HB', label: 'Hebrew' },
        { value: 'HI', label: 'Hindi' },
        { value: 'HU', label: 'Hungarian' },
        { value: 'AI', label: 'Indigenous Languages' },
        { value: 'IN', label: 'Indonesian First Language' },
        { value: 'IX', label: 'Indonesian Second Language' },
        { value: 'IE', label: 'Industry and Enterprise' },
        { value: 'IT02', label: 'Informatics' },
        { value: 'IL', label: 'Italian' },
        { value: 'JA', label: 'Japanese First Language' },
        { value: 'JS', label: 'Japanese Second Language' },
        { value: 'LO55', label: 'Karen' },
        { value: 'KH', label: 'Khmer' },
        { value: 'KO', label: 'Korean First Language' },
        { value: 'KS', label: 'Korean Second Language' },
        { value: 'LA', label: 'Latin' },
        { value: 'LS', label: 'Legal Studies' },
        { value: 'LI', label: 'Literature' },
        { value: 'MA', label: 'Macedonian' },
        { value: 'ML', label: 'Maltese' },
        { value: 'NJ', label: 'Mathematical Methods' },
        { value: 'ME', label: 'Media' },
        { value: 'MC05', label: 'Music Investigation' },
        { value: 'MC04', label: 'Music Performance' },
        { value: 'MD', label: 'Music Style and Composition' },
        { value: 'OS', label: 'Outdoor and Environmental Studies' },
        { value: 'PN', label: 'Persian' },
        { value: 'PL', label: 'Philosophy' },
        { value: 'PE', label: 'Physical Education' },
        { value: 'PH', label: 'Physics' },
        { value: 'PO', label: 'Polish' },
        { value: 'PG', label: 'Portuguese' },
        { value: 'DT', label: 'Product Design and Technology' },
        { value: 'PY', label: 'Psychology' },
        { value: 'LO49', label: 'Punjabi' },
        { value: 'RS', label: 'Religion and Society' },
        { value: 'HR', label: 'Revolutions' },
        { value: 'RO', label: 'Romanian' },
        { value: 'RU', label: 'Russian' },
        { value: 'SE', label: 'Serbian' },
        { value: 'SI', label: 'Sinhala' },
        { value: 'SO03', label: 'Sociology' },
        { value: 'IT03', label: 'Software Development' },
        { value: 'SP', label: 'Spanish' },
        { value: 'NS', label: 'Specialist Mathematics' },
        { value: 'SA', label: 'Studio Arts' },
        { value: 'SW', label: 'Swedish' },
        { value: 'SE03', label: 'Systems Engineering' },
        { value: 'TA', label: 'Tamil' },
        { value: 'TT', label: 'Texts and Traditions' },
        { value: 'TS', label: 'Theatre Studies' },
        { value: 'TU', label: 'Turkish' },
        { value: 'BU23', label: 'VCE VET Business' },
        { value: 'CT41', label: 'VCE VET Community Services' },
        { value: 'MU07', label: 'VCE VET Creative and Digital Media' },
        { value: 'DN06', label: 'VCE VET Dance' },
        { value: 'EG16', label: 'VCE VET Engineering Studies' },
        { value: 'EQ05', label: 'VCE VET Equine Studies' },
        { value: 'FN19', label: 'VCE VET Furnishing' },
        { value: 'CT37', label: 'VCE VET Health Services' },
        { value: 'HS31', label: 'VCE VET Hospitality' },
        { value: 'HS32', label: 'VCE VET Hospitality (Kitchen Operations)' },
        { value: 'IN60', label: 'VCE VET Information Technology' },
        { value: 'ET16', label: 'VCE VET Integrated Technologies' },
        { value: 'LB21', label: 'VCE VET Laboratory Skills' },
        { value: 'MI19', label: 'VCE VET Music Performance' },
        { value: 'MI30', label: 'VCE VET Music Sound Production' },
        { value: 'SR41', label: 'VCE VET Sport and Recreation' },
        { value: 'LO54', label: 'Vietnamese First Language' },
        { value: 'VT', label: 'Vietnamese Second Language' },
        { value: 'VC', label: 'Visual Communication Design' }
    ]

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
            <View style={[styles.container, { backgroundColor: bgColor }]}>

                <View style={styles.dropdownView}>
                    <Dropdown
                        style={styles.dropdown}
                        data={data}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder="Select Subject"
                        searchPlaceholder="Search..."
                        value={displaySubject}
                        onChange={item => {
                            setSelectedSubject(item.label);
                            setDisplaySubject(item.value);
                        }}
                    />
                </View>

                <View style={styles.sectionStyle}>
                    <View style={styles.timeDisplay}>
                        <ImageBackground style={styles.imgBackground}
                            resizeMode='cover'
                            source={bgImage}
                        >
                            {
                                timeSubmitted ?
                                    <Text style={styles.greatJob}>GREAT JOB!</Text> : null
                            }
                            <Stopwatch
                                laps
                                secs
                                start={isStopwatchStart}
                                // To start
                                reset={resetStopwatch}
                                // To reset
                                options={options}
                                // Options for the styling
                                getTime={getFormattedTime}
                            />
                        </ImageBackground>
                    </View>

                    {timeSubmitted == false ?

                        // Buttons part
                        <View style={styles.buttonDisplay}>
                            {!isTimerStart ?
                                <TouchableHighlight style={styles.bottomButtonStart}
                                    onPress={() => {
                                        if (!selectedSubject) {
                                            Alert.alert(
                                                "SUBJECT NOT SELECTED",
                                                "No Subject is selected. Kindly select a subject.",
                                                [
                                                    {
                                                        text: "OK",
                                                        onPress: () => console.log("Subject Not Selected")
                                                    }
                                                ]
                                            );
                                        } else {
                                            setIsTimerStart(true);
                                            setIsStopwatchStart(!isStopwatchStart);
                                            setResetStopwatch(false);
                                            trackingStart();
                                        }
                                    }}>
                                    <Text style={styles.buttonText}>
                                        START TRACKING
                                    </Text>
                                </TouchableHighlight>
                                :
                                <View style={styles.bottomButtons}>
                                    <TouchableHighlight style={styles.bottomButtonStop}
                                        onPress={() => {
                                            setIsStopwatchStart(false);
                                            // setResetStopwatch(true);
                                            setTimeSubmitted(true);
                                            trackingStop();
                                        }}>
                                        <Text style={styles.buttonText}>
                                            STOP
                                        </Text>
                                    </TouchableHighlight>

                                    {isStopwatchStart == false ?
                                        <TouchableHighlight style={styles.bottomButtonResume}
                                            onPress={() => {
                                                setIsStopwatchStart(!isStopwatchStart);
                                                setResetStopwatch(false);
                                                trackingStart();
                                                // setPauseStopwatch(true);
                                            }}>
                                            <Text style={styles.buttonText}>RESUME</Text>
                                        </TouchableHighlight>

                                        :
                                        <TouchableHighlight style={styles.bottomButtonPause}
                                            onPress={() => {
                                                setIsTimerStart(true);
                                                setIsStopwatchStart(!isStopwatchStart);
                                                setResetStopwatch(false);
                                                trackingPause();
                                                // setPauseStopwatch(true);
                                            }}>
                                            <Text style={styles.buttonText}>PAUSE</Text>
                                        </TouchableHighlight>
                                    }

                                </View>
                            }
                        </View>
                        :

                        //How do you feel today
                        <View style={styles.reactionText}>
                            <Text style={styles.reactionTextHead}>
                                HOW DO YOU FEEL TODAY?
                            </Text>

                            <View style={styles.reactionEmojis}>
                                <Text style={styles.textTemp} onPress={() => {
                                    submitTrackedData(1);
                                }} >☹️</Text>
                                <Text style={styles.textTemp} onPress={() => {
                                    submitTrackedData(2);
                                }} >🙁</Text>
                                <Text style={styles.textTemp} onPress={() => {
                                    submitTrackedData(3);
                                }} >😐</Text>
                                <Text style={styles.textTemp} onPress={() => {
                                    submitTrackedData(4);
                                }} >🙂</Text>
                                <Text style={styles.textTemp} onPress={() => {
                                    submitTrackedData(5);
                                }} >😀</Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // backgroundColor: bgColor,
    },
    sectionStyle: {
        flex: 1,
        alignItems: 'center',
    },
    timeDisplay: {
        height: '75%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisplay: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        paddingVertical: '8%',
    },
    bottomButtons: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#30D291',
    },
    bottomButtonStop: {
        width: '48%',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: "bold",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderRadius: 25,
        backgroundColor: '#FD7A65',
    },
    bottomButtonPause: {
        width: '48%',
        color: '#ffffff',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderColor: 'black',
        borderRadius: 25,
        backgroundColor: '#123F2E',
    },
    bottomButtonResume: {
        width: '48%',
        color: '#ffffff',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderColor: 'black',
        borderRadius: 25,
        backgroundColor: '#30D291',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Rubik-Black',
    },
    reactionText: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
    },
    reactionTextHead: {
        height: '75%',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Rubik'
    },
    reactionEmojis: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textTemp: {
        fontSize: 30
    },
    greatJob: {
        fontSize: 14,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
    },
    dropdownView: {
        height: 60,
        width: '100%',
    },
    dropdown: {
        height: 60,
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        borderColor: '#6B6B6B',
        borderWidth: 1,
        paddingHorizontal: 15,
    },
});

const options = {
    container: {
        padding: 5,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 60,
        fontFamily: 'Rubik-Black',
        fontWeight: 'bold',
        color: '#000000',
        // marginLeft: 7,
    },
};

export default Atarcalculator;
