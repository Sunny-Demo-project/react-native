import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const DropDown = ({ handleSubjects, position, }) => {

    // alert(JSON.stringify(subjects));

    const calculateScaledScore = () => {
        if (number > 50) { // Score Cannot Be Greater Than 50
            onChangeNumber('50');
            Alert.alert(
                "Invalid Score",
                "Your Score cannot be greater than 50. ",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            handleSubjects({
                                subject: 50,
                                raw: number
                            });
                            calculateScaled();
                        }
                    }
                ]
            );
        }
        else {
            handleSubjects({
                subject: selectedSubject,
                raw: number
            });
            calculateScaled();
        }
    }

    async function calculateScaled() {

        const formData = new FormData();
        formData.append('mysubjects[]', selectedSubject);
        formData.append('raw[]', number);
        var response = await axios.post(
            "https://calculator.studentgarden.com/site/vceatarresult",
            // pass that subject here
            formData,
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
    }

    const [selectedSubject, setSelectedSubject] = useState();
    const [inputMarks, setInputMarks] = useState(false);
    const [number, onChangeNumber] = React.useState(null);
    const [scaledScore, setScaledScore] = React.useState(null);
    const [isFocus, setIsFocus] = useState(false);

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

    const smallData = [
        { value: 'EN', label: 'English' },
        { value: 'EF', label: 'English (EAL)' },
        { value: 'EG', label: 'English Language' },
        { value: 'LI', label: 'Literature' },
    ]

    return (
        <View style={styles.dropdownInput}>
            <View style={styles.dropdownView}>
                {position == 1 ?
                    <Dropdown
                        style={styles.dropdown}
                        data={smallData}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder="Select Subject"
                        searchPlaceholder="Search..."
                        value={selectedSubject}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setSelectedSubject(item.value),
                                setInputMarks(true)
                        }}
                    /> :
                    <Dropdown
                        style={styles.dropdown}
                        data={data}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder="Select Subject"
                        searchPlaceholder="Search..."
                        value={selectedSubject}
                        activeColor={'#30D291'}
                        onChange={item => {
                            setSelectedSubject(item.value),
                                setInputMarks(true)
                        }}
                    />
                }

            </View>

            <View style={styles.marksInput}>
                <TextInput
                    style={styles.marksInputValue}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="..."
                    keyboardType="numeric"
                    editable={inputMarks}
                    selectTextOnFocus={inputMarks}
                    onBlur={calculateScaledScore}
                />
            </View>

            <View style={styles.marksInput}>
                <TextInput
                    style={styles.marksInputValue}
                    value={scaledScore}
                    placeholder="..."
                    keyboardType="numeric"
                    editable={false}
                    selectTextOnFocus={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

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
        width: '100%',
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 5,
    },
    dropdownView: {
        height: 50,
        width: '50%',
    },
    dropdown: {
        height: 50,
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        borderColor: '#30D291',
        borderWidth: 1,
        paddingHorizontal: 15,
    },
    marksInput: {
        height: 50,
        width: '20%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, .25)',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    marksInputValue: {
        alignItems: "center",
        justifyContent: "center",
    }
})

export default DropDown;