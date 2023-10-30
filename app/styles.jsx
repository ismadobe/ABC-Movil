import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '20px 0px',
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
    error: {
        color: 'red',
    }
});

export default styles;