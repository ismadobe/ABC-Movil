import {FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles";
import i18n from "../../translations/i18n";
import React, {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {defaultMessages, useValidation} from "react-simple-form-validator";
import Store from "../../shared/Store";
import {router} from "expo-router";

const searchStyles = StyleSheet.create({
    projectButton: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignItems: 'center',
        borderRadius: 5,
        lineHeight: 1
    },
    createProject: {
        backgroundColor: '#3B82F6',
    },
    viewProject: {
        backgroundColor: '#3B82F6',
    },
});

const SearchPage = () => {
    const hardSkills = [
        { name: 'Desarrollo de software', id: 'Software' },
        { name: 'Bases de datos', id: 'Databases' },
        { name: 'Administración de redes', id: 'Networks' },
        { name: 'Soporte técnico', id: 'Technical Support' },
    ];

    const [personality, setPersonality] = useState('');
    const [skill, setSkill] = useState([]);
    const [users, setUsers] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const [touchedFields, setTouchedFields] = useState({
        personality: false,
        skill: false,
    });

    const items = [
        { name: 'Desarrollo de software', id: 'Software' },
        { name: 'Bases de datos', id: 'Databases' },
        { name: 'Administración de redes', id: 'Networks' },
        { name: 'Soporte técnico', id: 'Technical Support' },
    ];

    const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
        fieldsRules: {
            personality: { required: true },
            skill: { required: true }
        },
        state: { personality, skill },
        locale: 'es',
        messages: {
            ...defaultMessages,
            es: { ...defaultMessages['es'], required: 'El campo es requerido', email: 'El correo electrónico no es válido'}
        }
    });

    const onBlurHandler = (event, field) => setTouchedFields((prevFields) => ({ ...prevFields, [field]: true }));

    const handleFormSubmit = async () => {
        setTouchedFields({
            personality: true,
            skill: true,
        })

        if (!isFormValid) { return }

        try {
            const response = await fetch(`https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/users?skill=${skill}&personality=${personality}`, {
                method: 'GET'
            });

            const data = await response.json();

            if (response.status === 200) {
                setIsVisible(true)
                setUsers(data.users)
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    return (
        <View style={[styles.privateContainer]}>
            <View style={{
                marginBottom: 20,
            }}>
                <Text style={[styles.headingAlternative, {marginBottom: 0}]}>{i18n.t('searchCandidateTitle')}</Text>
                <Text style={{ color: '#6B7280', fontSize: 12}}>{i18n.t('searchCandidateSubtitle')}</Text>
            </View>

            <View contentContainerStyle={{width: '100%'}}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{i18n.t('hardSkills')}:</Text>
                    <View
                        style={styles.picker}>
                        <Picker
                            style={styles.picker}
                            selectedValue={skill}
                            defaultValue=""
                            onBlur={(event) => onBlurHandler(event, 'language')}
                            onValueChange={(itemValue) => setSkill(itemValue)}
                        >
                            <Picker.Item label={i18n.t('selectOption')} value=""/>
                            <Picker.Item label="Python" value="Python"/>
                            <Picker.Item label="Javascript" value="Javascript"/>
                            <Picker.Item label="PHP" value="PHP"/>
                            <Picker.Item label="NodeJS" value="NodeJS"/>
                        </Picker>
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>{i18n.t('personality')}:</Text>
                    <View
                        style={styles.picker}>
                        <Picker
                            selectedValue={personality}
                            onValueChange={(itemValue) => setPersonality(itemValue)}
                            onBlur={(event) => onBlurHandler(event, 'personality')}
                        >
                            <Picker.Item label={i18n.t('selectOption')} value=""/>
                            <Picker.Item label="Extrovertido" value="Extrovertido"/>
                            <Picker.Item label="Introvertido" value="Introvertido"/>
                            <Picker.Item label="Calmado" value="Calm"/>
                            <Picker.Item label="Feliz" value="Feliz"/>
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleFormSubmit} disabled={!isFormValid}>
                    <Text style={styles.buttonText}>{i18n.t('search')}</Text>
                </TouchableOpacity>

                {
                    users ?
                        isVisible && users.length > 0
                            ?
                                <View style={{marginTop: 20}}>
                                    <Text style={[styles.headingAlternative, {marginBottom: 0}]}>{i18n.t('results')}</Text>

                                    <FlatList
                                        style={{marginTop: 20}}
                                        data={users}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({item}) => (
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    await Store.saveToken('candidate', JSON.stringify(item))
                                                    router.replace(`/users/${item.id}`)
                                                }
                                                } style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                paddingVertical: 10,
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                            >
                                                <Text style={{fontSize: 12}}>{item.name}</Text>
                                                <Pressable style={[searchStyles.projectButton, searchStyles.viewProject]}>
                                                    <Text style={{fontSize: 10, color: '#FFF'}}>{i18n.t('seeDetails')}</Text>
                                                </Pressable>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                        :
                            <Text style={{marginTop: 20}}>{i18n.t('noResults')}</Text>
                    :
                        null
                }
            </View>
        </View>
    );
}
export default SearchPage;