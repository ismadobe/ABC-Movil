import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Modal, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from "../../../translations/i18n";
import styles from '../../styles';
import ModalRegistration from "./modal-sucess";
import {useValidation} from "react-simple-form-validator";

const CompanyRegister = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [size, setSize] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [sector, setSector] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
        fieldsRules: {
            name: { required: true },
            password: { required: true },
            email: { email: true, required: true },
            size: { required: true },
            location: { required: true },
            website: { required: true },
            sector: { required: true }
        },
        state: { name,  password,  email,  size,  location,  website, sector }
    });

    const handleFormSubmit = async () => {
        if (!isFormValid) { return }

        try {
            const data = {
                name,
                email,
                password,
                size,
                location,
                sector,
                website
            }

            const response = await fetch('https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const company = await response.json();
            if (response.status === 201) {
                setIsVisible(true)
            } else {
                console.log('response', response.status, data);
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
                <Text style={styles.label}>{i18n.t('size')}:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={size}
                        onValueChange={(itemValue) => setSize(itemValue)}
                    >
                        <Picker.Item label={i18n.t('selectOption')} value=""/>
                        <Picker.Item label="< 100" value="< 100"/>
                        <Picker.Item label="Entre 100 y 200" value="Entre 100 y 200"/>
                        <Picker.Item label="> 200" value="> 200"/>
                    </Picker>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('location')}:</Text>
                <TextInput
                    style={styles.input}
                    selectedValue={location}
                    onChangeText={(itemValue) => setLocation(itemValue)}
                    value={location}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('website')}:</Text>
                <TextInput
                    style={styles.input}
                    selectedValue={website}
                    onChangeText={(itemValue) => setWebsite(itemValue)}
                    value={website}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('sector')}:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={sector}
                        onValueChange={(itemValue) => setSector(itemValue)}
                    >
                        <Picker.Item label={i18n.t('selectOption')} value=""/>
                        <Picker.Item label="Construcción" value="Construcción"/>
                        <Picker.Item label="Ingenieria" value="Ingenieria"/>
                        <Picker.Item label="Publicidad" value="Publicidad"/>
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

export default CompanyRegister;