import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from "../../translations/i18n";
const CandidateRegister = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('');
    const [location, setLocation] = useState('');
    const [personality, setPersonality] = useState('');

    const handleFormSubmit = () => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario
        console.log('Nombre:', name);
        console.log('Contraseña:', password);
        console.log('Correo:', email);
        console.log('Tamaño:', language);
        console.log('Ubicación:', location);
        console.log('Sector:', personality);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{i18n.t('name')}:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
            />

            <Text style={styles.label}>{i18n.t('password')}:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />

            <Text style={styles.label}>{i18n.t('email')}:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />

            <Text style={styles.label}>{i18n.t('language')}:</Text>
            <Picker
                style={styles.input}
                selectedValue={language}
                onValueChange={(itemValue) => setLanguage(itemValue)}
            >
                <Picker.Item label="Español" value="spanish" />
                <Picker.Item label="Inglés" value="english" />
            </Picker>

            <Text style={styles.label}>{i18n.t('hardSkills')}:</Text>
            <Picker
                style={styles.input}
                selectedValue={location}
                onValueChange={(itemValue) => setLocation(itemValue)}
            >
                <Picker.Item label="Norte" value="north" />
                <Picker.Item label="Sur" value="south" />
                <Picker.Item label="Este" value="east" />
                <Picker.Item label="Oeste" value="west" />
            </Picker>

            <Text style={styles.label}>{i18n.t('personality')}:</Text>
            <Picker
                style={styles.input}
                selectedValue={personality}
                onValueChange={(itemValue) => setPersonality(itemValue)}
            >
                <Picker.Item label="Extrovertido" value="extrovertido" />
                <Picker.Item label="Introvertido" value="introvertido" />
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
                <Text style={styles.buttonText}>{i18n.t('send')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '20px 0px  ',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default CandidateRegister;