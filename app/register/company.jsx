import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from "../../translations/i18n";
const CompanyRegister = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [size, setSize] = useState('');
    const [location, setLocation] = useState('');
    const [sector, setSector] = useState('');

    const handleFormSubmit = () => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario
        console.log('Nombre:', name);
        console.log('Contraseña:', password);
        console.log('Correo:', email);
        console.log('Tamaño:', size);
        console.log('Ubicación:', location);
        console.log('Sector:', sector);
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

            <Text style={styles.label}>{i18n.t('size')}:</Text>
            <Picker
                style={styles.input}
                selectedValue={size}
                onValueChange={(itemValue) => setSize(itemValue)}
            >
                <Picker.Item label="Pequeño" value="small" />
                <Picker.Item label="Mediano" value="medium" />
                <Picker.Item label="Grande" value="large" />
            </Picker>

            <Text style={styles.label}>{i18n.t('location')}:</Text>
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

            <Text style={styles.label}>{i18n.t('sector')}:</Text>
            <Picker
                style={styles.input}
                selectedValue={sector}
                onValueChange={(itemValue) => setSector(itemValue)}
            >
                <Picker.Item label="Sector A" value="sectorA" />
                <Picker.Item label="Sector B" value="sectorB" />
                <Picker.Item label="Sector C" value="sectorC" />
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

export default CompanyRegister;