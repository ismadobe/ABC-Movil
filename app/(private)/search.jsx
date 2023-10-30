import {ScrollView, Text, View} from "react-native";
import styles from "../styles";

const SearchPage = () => {
    return (
        <View style={[styles.privateContainer]}>
            <ScrollView contentContainerStyle={{width: '100%'}}>
                <Text>Search</Text>
            </ScrollView>
        </View>
    );
}
export default SearchPage;