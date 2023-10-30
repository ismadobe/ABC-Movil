import {
    ActivityIndicator,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import styles from "../styles";
import {DEV_URL} from "../../constants";
import {useEffect, useState, useCallback} from "react";
import {Link, router} from "expo-router";
import {useNavigation} from "@react-navigation/native";
import ProjectPage from "./projects/[id]";
import Store from "../../shared/Store";

const projectStyles = StyleSheet.create({
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

const HomePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            let user = await Store.getToken('user');
            user = JSON.parse(user);
            const response = await fetch(`${DEV_URL}/projects/companies/` + user.id);
            const result = await response.json();
            setData(result.projects);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <View style={[styles.privateContainer]}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    return (
        <View style={[styles.privateContainer]}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={[styles.headingAlternative, {marginBottom: 0}]}>Proyectos</Text>
                {/*<Pressable style={[projectStyles.projectButton, projectStyles.createProject]}>*/}
                {/*    <Text style={{ fontSize: 12, color: '#FFF'}}>Crear proyecto</Text>*/}
                {/*</Pressable>*/}
            </View>
            <FlatList
                style={{ marginTop: 20}}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={async () => {
                            await Store.saveToken('project', JSON.stringify(item))
                            router.replace(`/projects/${item.id}`)}
                        } style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingVertical: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 12 }}>{item.title}</Text>
                        <Pressable style={[projectStyles.projectButton, projectStyles.viewProject]}>
                            <Text style={{ fontSize: 10, color: '#FFF' }}>Ver detalle</Text>
                        </Pressable>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
export default HomePage;