import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '20px 0px',
    },
    privateContainer: {
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 20,
    },
    formGroup: {
        marginBottom: 15
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    picker: {
        borderStyle: "solid",
        borderColor: 'gray',
        borderWidth: 1,      // Set the border width
        padding: 0,
        height: "auto",
    },
    button: {
        backgroundColor: '#3B82F6',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
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
    headingAlternative: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2A3342',
        marginTop: 0,
        marginBottom: 16
    },
    subheading: {
        fontSize: 18,
        fontWeight: '500',
        color: '#556987',
        marginBottom: 16
    },
    error: {
        color: 'red',
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
    projectButton: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignItems: 'center',
        borderRadius: 5,
        lineHeight: 1
    },
    createProject: {
        backgroundColor: '#3B82F6',
    },
    viewProject: {
        backgroundColor: '#3B82F6',
    },
});

export default styles;