import {ScrollView, Text, View} from "react-native";
import styles from "../styles";
const ProfilePage = () => {
    return (
        <View style={[styles.privateContainer]}>
            <ScrollView contentContainerStyle={{width: '100%'}}>
                <Text>Profile</Text>
            </ScrollView>
        </View>
    );
}
export default ProfilePage;