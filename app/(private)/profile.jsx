import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles";
import i18n from "../../translations/i18n";
import React from "react";
import Store from "../../shared/Store";
import {router} from "expo-router";
const ProfilePage = () => {
    return (
        <View style={[styles.privateContainer]}>
            <TouchableOpacity style={styles.button} onPress={async () => {
                await Store.removeToken('user');
                router.replace('/login');
            }}>
                <Text style={styles.buttonText}>{i18n.t('signOut')}</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ProfilePage;