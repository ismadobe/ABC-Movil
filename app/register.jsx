import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from "react";
import CompanyRegister from "./pages/register/company";
import CandidateRegister from "./pages/register/candidate";
import i18n from "../translations/i18n";
import {Link} from "expo-router";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'radial-gradient(50% 50% at 50% 50%, rgba(247, 248, 249, 0.00) 0%, #F7F8F9 100%)'
    },
    textCenter: {
        textAlign: 'center'
    },
    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#2A3342',
        marginBottom: 16
    },
    subheading: {
        fontSize: 18,
        fontWeight: '500',
        color: '#556987',
        marginBottom: 16
    },

    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderRadius: 6,
        overflow: 'hidden',
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    tab: {
        paddingVertical: 10,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        color: '#556987',
        fontWeight: '500',
        fontSize: 14,
        border: '1px solid #EEF0F3',
    },
    activeTab: {
        backgroundColor: '#B1CDFB'
    },
    tabText: {
        fontSize: 16,
        color: 'black',
    },
    contentContainer: {
        padding: 20,
        flex: 1
    },
});
export default function Register() {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <View style={[styles.container]}>
            <ScrollView contentContainerStyle={{width: '100%'}}>
                <View style={{marginBottom: 48,  paddingTop: 80}}>
                    <Text style={[styles.heading, styles.textCenter]}>{i18n.t('register')}</Text>
                    <Text style={[styles.subheading, styles.textCenter]}>{i18n.t('subtitleRegister')}</Text>
                </View>

                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'tab1' && styles.activeTab]}
                        onPress={() => handleTabPress('tab1')}
                    >
                        <Text style={styles.tabText}>{i18n.t('company')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'tab2' && styles.activeTab]}
                        onPress={() => handleTabPress('tab2')}
                    >
                        <Text style={styles.tabText}>{i18n.t('candidate')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    {activeTab === 'tab1' && <CompanyRegister></CompanyRegister>}
                    {activeTab === 'tab2' && <CandidateRegister></CandidateRegister>}
                </View>

                <Link href="/login" style={styles.textCenter}>
                    {i18n.t('haveAccount')} <Text style={{color: '#B1CDFB'}}>{i18n.t('loginAccount')}</Text>
                </Link>
            </ScrollView>
        </View>
    );
}
