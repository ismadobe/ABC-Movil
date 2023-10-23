import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import i18n from "../../../translations/i18n";
import styles from "../../styles";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ModalRegistration from "./modal-sucess";
import {useValidation} from "react-simple-form-validator";

const CandidateRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [personality, setPersonality] = useState('');
    const [skills, setSkills] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const items = [
        { name: 'Desarrollo de software', id: 'Software' },
        { name: 'Bases de datos', id: 'Databases' },
        { name: 'Administración de redes', id: 'Networks' },
        { name: 'Soporte técnico', id: 'Technical Support' },
    ];

    const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
        fieldsRules: {
            name: { required: true },
            password: { required: true },
            email: { email: true, required: true },
            phone: { required: true },
            language: { required: true },
            country: { required: true },
            personality: { required: true },
            skills: { required: true }
        },
        state: { name,  password,  email,  phone,  language,  country, personality, skills }
    });

    const handleFormSubmit = async () => {
        if (!isFormValid) { return }

        const data = {
            name,
            email,
            password,
            language,
            phone,
            country,
            skills,
            "personality": [personality]
        }

        try {
            const response = await fetch('https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const user = await response.json();

            if (response.status === 200) {
                setIsVisible(true)
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('name')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('email')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('password')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('phone')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('country')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setCountry(text)}
                    value={country}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('language')}:</Text>
                <View
                    style={styles.picker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={language}
                        defaultValue=""
                        onValueChange={(itemValue) => setLanguage(itemValue)}
                    >
                        <Picker.Item label={i18n.t('selectOption')} value=""/>
                        <Picker.Item label="Español" value="es"/>
                        <Picker.Item label="Inglés" value="en"/>
                    </Picker>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('hardSkills')}:</Text>

                    <SectionedMultiSelect
                        style={styles.picker}
                        items={items}
                        // ref={(component) => { this.multiSelect = component }}
                        uniqueKey="id"
                        IconRenderer={Icon}
                        hideTags
                        alwaysShowSelectText={false}
                        selectedItems={skills}
                        selectText={i18n.t('hardSkills')}
                        selectedText={i18n.t('selected')}
                        confirmText={i18n.t('confirm')}
                        onSelectedItemsChange={(itemValue) => setSkills(itemValue)}
                        searchPlaceholderText=""
                    >
                    </SectionedMultiSelect>
                <View>
                    {JSON.stringify(this.skills)}
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('personality')}:</Text>
                <View
                    style={styles.picker}>
                    <Picker
                        selectedValue={personality}
                        onValueChange={(itemValue) => setPersonality(itemValue)}
                    >
                        <Picker.Item label={i18n.t('selectOption')} value=""/>
                        <Picker.Item label="Extrovertido" value="Extrovertido"/>
                        <Picker.Item label="Introvertido" value="Introvertido"/>
                        <Picker.Item label="Calmado" value="Calmado"/>
                        <Picker.Item label="Feliz" value="Feliz"/>
                    </Picker>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleFormSubmit} disabled={!isFormValid}>
                <Text style={styles.buttonText}>{i18n.t('send')}</Text>
            </TouchableOpacity>

            <ModalRegistration
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
            />
        </View>
    );
};
export default CandidateRegister;