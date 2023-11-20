import {
    FlatList, Modal, Pressable,
    StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import styles from "../../styles";
import {useRoute} from "@react-navigation/native";
import React, {useCallback, useEffect, useState} from "react";
import Store from "../../../shared/Store";
import i18n from "../../../translations/i18n";
import {Picker} from "@react-native-picker/picker";

const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        backgroundColor: 'white',
        padding: 55,
        borderRadius: 10,
        width: '90%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '50%'
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

const ProjectPage = () => {
    const route = useRoute();
    const {id} = route.params;

    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState([]);
    const [projectId, setProjectId] = useState(null);
    const [interviews, setInterviews] = useState([]);
    const [technicalTests, setTechnicalTests] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(null);

    useEffect(() => {
        getParentProject();
        getData();
        getProjects();
    }, [id]);

    const getData = useCallback(async () => {
        if (!id) return;
        const user = await Store.getToken('candidate');
        setUser(JSON.parse(user));
    }, [id]);

    const getProjects = useCallback(async () => {
        let company = await Store.getToken('user');
        company = JSON.parse(company);

        try {
            const response = await fetch(`https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/projects/companies/${company.id}`, {
                method: 'GET'
            });

            const data = await response.json();

            if (response.status === 200) {
                setProjects(data ? data.projects : [])
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    }, [])
    
    const getTestsByProjectId = useCallback(async (projectId) => {
        if (!projectId) return;
        try {
            const res = await fetch(`https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/tests/projects/${projectId}`, {
                method: 'GET'
            });

            const candidate = await Store.getToken('candidate')
            const userId = JSON.parse(candidate).id;

            const tests = await res.json()

            if (tests && tests.length) {
                const testsByUser = tests.filter(test => String(test['hard_skills'][0]) == userId);
                const interviews = [...testsByUser].filter(test => test.type === 'interview');
                const technicalTests = [...testsByUser].filter(test => test.type === 'technical');

                setInterviews(interviews);
                setTechnicalTests(technicalTests)
                return;
            }

            setInterviews([]);
        } catch (err) {
            console.log('err', err);
        }
    }, [projectId])

    const getParentProject = async () => {
        const projectId = await Store.getToken('projectId');
        setProjectId(projectId);
        
        if (projectId) {
            await getTestsByProjectId(projectId);
        }
    };

    const selectCandidateToProject = async () => {
        if (!project) return;

        try {
            const response = await fetch(`https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/projects/${project}/selectcandidates/${id}`, {
                method: 'POST'
            });

            if (response.status === 200) {
                setIsModalVisible(false);
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    }

    if (!user) return;

    return (
        <View style={[styles.privateContainer]}>
            <Text style={styles.headingAlternative}>{user.name}</Text>

            <View>
                <Text style={{fontSize: 16, color: '#000', fontWeight: "600"}}>{i18n.t('softSkills')}</Text>

                <FlatList
                    style={{marginTop: 15}}
                    data={user.personality}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <Text style={{fontSize: 12, color: '#6B7280'}}>{item}</Text>
                    )}
                />
            </View>

            <View style={{marginTop: 20}}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: "600"}}>{i18n.t('hardSkills')}</Text>
                <View style={{marginTop: 15}}>
                    {
                        user && user?.skills?.map((skill, index) => {
                            return (
                                <Text key={index} style={{fontSize: 12, color: '#6B7280'}}>{skill}</Text>
                            )
                        })
                    }
                </View>
            </View>

            {
                !projectId &&
                <View style={{marginTop: 20}}>
                    <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.buttonText}>{i18n.t('selectCandidate')}</Text>
                    </TouchableOpacity>
                </View>
            }


            {
                interviews && interviews.length > 0 &&
                <View style={{marginTop: 15}}>
                    <Text style={[styles.subheading, {fontSize: 16, fontWeight: 700, marginBottom: 15}]}>Entrevistas</Text>
                    {interviews.map((interview, index) => (
                        <TouchableOpacity key={index} style={{marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 12, fontWeight: 700, marginBottom: 10}}>{interview.title}</Text>
                            <Text style={{fontSize: 10, color: '#6B7280'}}>{interview.difficulty_level}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            }


            {
                technicalTests && technicalTests.length > 0 &&
                <View style={{marginTop: 15}}>
                    <Text style={[styles.subheading, {fontSize: 16, fontWeight: 700, marginBottom: 15}]}>Pruebas técnicas</Text>
                    {technicalTests.map((test, index) => (
                        <TouchableOpacity key={index} style={{marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 12, fontWeight: 700, marginBottom: 10}}>{test.title}</Text>
                            <Text style={{fontSize: 10, color: '#6B7280'}}>{test.difficulty_level}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}>
                <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>
                        <Text style={stylesModal.modalText}>{i18n.t('selectProject')}</Text>


                        <View style={styles.picker}>
                            <Picker
                                selectedValue={project}
                                onValueChange={(itemValue) => setProject(itemValue)}
                            >
                                <Picker.Item label={i18n.t('selectOption')} value=""/>
                                {
                                    projects && projects.map((project, index) => {
                                        return (
                                            <Picker.Item key={index} label={project.title} value={project.id}/>
                                        )
                                    })
                                }
                            </Picker>
                        </View>

                        <Pressable
                            style={[styles.button, stylesModal.buttonClose]}
                            onPress={() => selectCandidateToProject()}>
                            <Text style={stylesModal.textStyle}>{i18n.t('select')}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


        </View>
    )
}
export default ProjectPage;