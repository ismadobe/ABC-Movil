import {Modal, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles";
import i18n from "../../../translations/i18n";
import React from "react";
import { router } from 'expo-router';

const ModalRegistration = ({ isVisible, onClose }) => {
    const goToLogin = () => {
        onClose()
        router.replace('/login');
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={() => onClose()}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.heading}>{i18n.t('registrationSuccess')}</Text>
                <TouchableOpacity style={styles.button}  onPress={goToLogin} >
                    <Text style={styles.buttonText}>{i18n.t('loginAccount')}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ModalRegistration;