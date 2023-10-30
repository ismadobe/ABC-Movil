import {ScrollView, Text, View} from "react-native";
import styles from "../styles";
const HomePage = () => {
    return (
        <View style={[styles.privateContainer]}>
            <ScrollView contentContainerStyle={{width: '100%'}}>
                <Text>Home</Text>
            </ScrollView>
        </View>
    );
}
export default HomePage;