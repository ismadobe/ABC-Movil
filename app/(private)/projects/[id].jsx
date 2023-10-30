import {Text, View} from "react-native";
import styles from "../../styles";
import {useRoute} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import Store from "../../../shared/Store";

const ProjectPage = () => {
    const route = useRoute();
    const {id} = route.params;

    const [project, setProject] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = useCallback(async () => {
        if (!id) return;
        const project = await Store.getToken('project');
        setProject(JSON.parse(project));
    }, [id]);

    if (!project) return;

    return (
        <View style={[styles.privateContainer]}>
            <Text style={styles.headingAlternative}>{project.title}</Text>

            <Text style={[styles.subheading, {fontSize: 16, fontWeight: 700, marginBottom: 5}]}>Descripción</Text>
            <Text style={{fontSize: 12, color: '#6B7280'}}>{project.description}</Text>
        </View>
    )
}
export default ProjectPage;