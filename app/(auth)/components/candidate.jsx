import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import i18n from "../../../translations/i18n";
import styles from "../../styles";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ModalRegistration from "./modal-sucess";
import {defaultMessages, useValidation} from "react-simple-form-validator";
defaultMessages

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

    const [touchedFields, setTouchedFields] = useState({
        name: false,
        email: false,
        password: false,
        phone: false,
        language: false,
        country: false,
        personality: false,
        skills: false,
        isVisible: false
    });

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
        state: { name,  password,  email,  phone,  language,  country, personality, skills },
        locale: 'es',
        messages: {
            ...defaultMessages,
            es: { ...defaultMessages['es'], required: 'El campo es requerido', email: 'El correo electrónico no es válido'}
        }
    });

    const onBlurHandler = (event, field) => setTouchedFields((prevFields) => ({ ...prevFields, [field]: true }));

    const handleFormSubmit = async () => {
        setTouchedFields({
            name: true,
            email: true,
            password: true,
            phone: true,
            language: true,
            country: true,
            personality: true,
            skills: true,
            isVisible: true
        })

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
                    onBlur={(event) => onBlurHandler(event, 'name')}
                    value={name}
                />
                <Text style={styles.error}>
                    {touchedFields.name && isFieldInError('name') && getErrorsInField('name').join('\n')}
                </Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('email')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    onBlur={(event) => onBlurHandler(event, 'email')}
                    keyboardType="email-address"
                />
                <Text style={styles.error}>
                    {touchedFields.email && isFieldInError('email') && getErrorsInField('email').join('\n')}
                </Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('password')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    onBlur={(event) => onBlurHandler(event, 'password')}
                    autoCapitalize="none"
                />
                <Text style={styles.error}>
                    {touchedFields.password && isFieldInError('password') && getErrorsInField('password').join('\n')}
                </Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('phone')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    onBlur={(event) => onBlurHandler(event, 'phone')}
                    autoCapitalize="none"
                />
                <Text style={styles.error}>
                    {touchedFields.phone && isFieldInError('phone') && getErrorsInField('phone').join('\n')}
                </Text>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('country')}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setCountry(text)}
                    value={country}
                    onBlur={(event) => onBlurHandler(event, 'country')}
                    autoCapitalize="none"
                />
                <Text style={styles.error}>
                    {touchedFields.country && isFieldInError('country') && getErrorsInField('country').join('\n')}
                </Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('language')}:</Text>
                <View
                    style={styles.picker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={language}
                        defaultValue=""
                        onBlur={(event) => onBlurHandler(event, 'language')}
                        onValueChange={(itemValue) => setLanguage(itemValue)}
                    >
                        <Picker.Item label={i18n.t('selectOption')} value=""/>
                        <Picker.Item label="Español" value="es"/>
                        <Picker.Item label="Inglés" value="en"/>
                    </Picker>
                </View>
                <Text style={styles.error}>
                    {touchedFields.language && isFieldInError('language') && getErrorsInField('language').join('\n')}
                </Text>
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

                <Text style={styles.error}>
                    {touchedFields.hardSkills && isFieldInError('hardSkills') && getErrorsInField('hardSkills').join('\n')}
                </Text>
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
                        <Picker.Item label="Calmado" value="Calmado"/>
                        <Picker.Item label="Feliz" value="Feliz"/>
                    </Picker>
                </View>
                <Text style={styles.error}>
                    {touchedFields.personality && isFieldInError('personality') && getErrorsInField('personality').join('\n')}
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleFormSubmit} >
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