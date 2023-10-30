import {Pressable, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles";
import i18n from "../../translations/i18n";
import {Link} from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {Picker} from "@react-native-picker/picker";

const SearchPage = () => {
    const hardSkills = [
        { name: 'Desarrollo de software', id: 'Software' },
        { name: 'Bases de datos', id: 'Databases' },
        { name: 'Administración de redes', id: 'Networks' },
        { name: 'Soporte técnico', id: 'Technical Support' },
    ];

    return (
        <View style={[styles.privateContainer]}>
            <View style={{
                marginBottom: 20,
            }}>
                <Text style={[styles.headingAlternative, {marginBottom: 0}]}>Búsqueda de candidatos</Text>
                <Text style={{ color: '#6B7280', fontSize: 12}}>Puedes filtrar por los criterios de cada columna</Text>
            </View>

            {/*<ScrollView contentContainerStyle={{width: '100%'}}>*/}
            {/*    <View style={{marginBottom: 48,  paddingTop: 80}}>*/}
            {/*        <Text style={[styles.heading, styles.textCenter]}>{i18n.t('loginAccount')}</Text>*/}
            {/*    </View>*/}

            {/*    <View style={{paddingLeft: 40, paddingRight: 40}}>*/}
            {/*        <View style={styles.formGroup}>*/}
            {/*            <Text style={styles.label}>{i18n.t('email')}:</Text>*/}
            {/*            <TextInput*/}
            {/*                style={styles.input}*/}
            {/*                onChangeText={(text) => setUsername(text)}*/}
            {/*                value={email}*/}
            {/*            />*/}
            {/*        </View>*/}

            {/*        <Picker*/}
            {/*            style={styles.picker}*/}
            {/*            selectedValue={language}*/}
            {/*            defaultValue=""*/}
            {/*            onBlur={(event) => onBlurHandler(event, 'language')}*/}
            {/*            onValueChange={(itemValue) => setLanguage(itemValue)}*/}
            {/*        >*/}
            {/*            <Picker.Item label={i18n.t('selectOption')} value=""/>*/}
            {/*            {*/}
            {/*                data.map((item, index) => (*/}
            {/*                    <Picker.Item key={index} label={item.name} value={item.id} />*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </Picker>*/}

            {/*        <TouchableOpacity style={styles.button} onPress={handleFormSubmit} disabled={!isFormValid}>*/}
            {/*            <Text style={styles.buttonText}>{i18n.t('send')}</Text>*/}
            {/*        </TouchableOpacity>*/}

            {/*        <Link href="/register" style={[styles.textCenter, {marginTop: 20}]}>*/}
            {/*            {i18n.t('dontHaveAccount')} <Text style={{color: '#B1CDFB'}}>{i18n.t('createAccount')}</Text>*/}
            {/*        </Link>*/}
            {/*    </View>*/}
            {/*</ScrollView>*/}
        </View>
    );
}
export default SearchPage;