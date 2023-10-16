import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import i18n from "../../translations/i18n";
import styles from "../styles";

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
                <Text style={styles.label}>{i18n.t('language')}:</Text>
                <View
                    style={styles.picker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={language}
                        onValueChange={(itemValue) => setLanguage(itemValue)}
                    >
                        <Picker.Item label="Español" value="spanish"/>
                        <Picker.Item label="Inglés" value="english"/>
                    </Picker>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>{i18n.t('hardSkills')}:</Text>
                <View
                    style={styles.picker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={location}
                        onValueChange={(itemValue) => setLocation(itemValue)}
                    >
                        <Picker.Item label="Desarrollo de software" value="software"/>
                        <Picker.Item label="Bases de datos" value="databases"/>
                        <Picker.Item label="Administración de redes" value="networks"/>
                        <Picker.Item label="Soporte técnico" value="technicalSupport"/>
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
                    >
                        <Picker.Item label="Extrovertido" value="extrovertido"/>
                        <Picker.Item label="Introvertido" value="introvertido"/>
                    </Picker>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
                <Text style={styles.buttonText}>{i18n.t('send')}</Text>
            </TouchableOpacity>
        </View>
    );
};
export default CandidateRegister;