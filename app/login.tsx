import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import i18n from "../translations/i18n";
import styles from "./styles";
import {Link, router} from "expo-router";
import React, {useState} from "react";
import {useValidation} from "react-simple-form-validator";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
        fieldsRules: {
            username: { required: true },
            password: { required: true },
        },
        state: { username,  password }
    });

    const handleFormSubmit = async () => {
        if (!isFormValid) { return }

        const data = {
            username,
            password,
        }

        try {
            const response = await fetch('https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/users/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const user = await response.json();

            if (response.status === 200) {
                router.replace('/private');
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    return (

        <View style={[styles.container]}>
            <ScrollView contentContainerStyle={{width: '100%'}}>
                <View style={{marginBottom: 48,  paddingTop: 80}}>
                    <Text style={[styles.heading, styles.textCenter]}>{i18n.t('loginAccount')}</Text>
                </View>

                <View style={{paddingLeft: 40, paddingRight: 40}}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{i18n.t('name')}:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setUsername(text)}
                            value={username}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{i18n.t('password')}:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleFormSubmit} disabled={!isFormValid}>
                        <Text style={styles.buttonText}>{i18n.t('send')}</Text>
                    </TouchableOpacity>

                    <Link href="/register" style={[styles.textCenter, {marginTop: 20}]}>
                        {i18n.t('dontHaveAccount')} <Text style={{color: '#B1CDFB'}}>{i18n.t('createAccount')}</Text>
                    </Link>
                </View>
            </ScrollView>
        </View>
    )
}