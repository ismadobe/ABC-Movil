import {ScrollView,  Text, TextInput, TouchableOpacity, View} from 'react-native';
import i18n from "../../translations/i18n";
import styles from "../styles";
import {Link, router} from "expo-router";
import React, {useEffect, useState} from "react";
import {useValidation} from "react-simple-form-validator";
import {DEV_URL} from "../../constants";
import Store from "../../shared/Store";

export default function Login() {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('company');
    const [url, setUrl] = useState('/companies/auth');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        Store.getToken('user')
            .then((user) => JSON.parse(user))
            .then((user) => {
                setIsLoading(false)
                if (user) router.replace('/home');
            })
    }, []);

    const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
        fieldsRules: {
            email: { required: true },
            password: { required: true },
        },
        state: { email,  password }
    });
    const handleTabPress = (tabName: string) => {
        setActiveTab(tabName);

        if(tabName === 'company') {
            setUrl('/companies/auth')
        } else {
            setUrl('/users/auth')
        }
    };

    const handleFormSubmit = async () => {
        if (!isFormValid) { return }

        const data = {
            email,
            password,
        }

        try {
            const response = await fetch(DEV_URL + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const user = await response.json();
            user.type = activeTab === 'company' ? 'companies' : 'users';

            if (response.status === 200) {
                await Store.saveToken('user', JSON.stringify(user))
                router.replace('/home');
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    if (isLoading) return null;

    return (
        <View style={[styles.container]}>
            <ScrollView contentContainerStyle={{width: '100%', paddingLeft: 40, paddingRight: 40}}>
                <View style={{marginBottom: 48,  paddingTop: 80}}>
                    <Text style={[styles.heading, styles.textCenter]}>{i18n.t('loginAccount')}</Text>
                </View>

                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'company' && styles.activeTab]}
                        onPress={() => handleTabPress('company')}
                    >
                        <Text style={styles.tabText}>{i18n.t('company')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'candidate' && styles.activeTab]}
                        onPress={() => handleTabPress('candidate')}
                    >
                        <Text style={styles.tabText}>{i18n.t('candidate')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 20}}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{i18n.t('email')}:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setUsername(text)}
                            value={email}
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

                    <TouchableOpacity style={styles.button} onPress={handleFormSubmit} >
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