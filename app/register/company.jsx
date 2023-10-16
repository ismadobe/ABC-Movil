import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from "../../translations/i18n";
import styles from '../styles';

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
                        <Picker.Item label="< 100" value="lessThan100"/>
                        <Picker.Item label="Entre 100 y 200" value="between100And200"/>
                        <Picker.Item label="> 200" value="moreThan200"/>
                    </Picker>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('location')}:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={location}
                        onValueChange={(itemValue) => setLocation(itemValue)}
                    >
                        <Picker.Item label="Norte" value="north"/>
                        <Picker.Item label="Sur" value="south"/>
                        <Picker.Item label="Este" value="east"/>
                        <Picker.Item label="Oeste" value="west"/>
                    </Picker>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('sector')}:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={sector}
                        onValueChange={(itemValue) => setSector(itemValue)}
                    >
                        <Picker.Item label="Sector A" value="sectorA"/>
                        <Picker.Item label="Sector B" value="sectorB"/>
                        <Picker.Item label="Sector C" value="sectorC"/>
                    </Picker>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
                <Text style={styles.buttonText}>{i18n.t('send')}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CompanyRegister;