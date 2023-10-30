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
    },
    button: {
        backgroundColor: '#3B82F6',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
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
    }
});

export default styles;