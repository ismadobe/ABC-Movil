import {Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles";
import {useRoute} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import Store from "../../../shared/Store";
import {DEV_URL} from "../../../constants";
import {useRouter} from "expo-router";
import i18n from "../../../translations/i18n";

const ProjectPage = () => {
    const route = useRoute();
    const router = useRouter();
    const {id} = route.params;

    const [project, setProject] = useState(null);
    const [tests, setTests] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [assignedCandidates, setAssignedCandidates] = useState([]);

    useEffect(() => {
        getProject().then(project => setProject(project));
        fetchTest().then(tests => setTests(tests));
        fetchSelectedCandidates().then(candidates => setCandidates(candidates));
        fetchAssignedCandidates().then(candidates => setAssignedCandidates(candidates));
    }, [id]);

    const getProject = async () => {
        if (!id) return;
        const project = await Store.getToken('project');
        return JSON.parse(project);
    };

    const fetchTest = async () => {
        try {
            const response = await fetch(`${DEV_URL}/tests/projects/${id}`);
            const tests = await response.json();
            return tests ?? []
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchSelectedCandidates = async () => {
        try {
            const response = await fetch(`${DEV_URL}/projects/${id}/selectedcandidates`);
            const candidates = await response.json();
            return candidates?.users ?? []
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchAssignedCandidates = async () => {
        try {
            const response = await fetch(`${DEV_URL}/projects/${id}/assignedcandidates`);
            const candidates = await response.json();
            return candidates?.users ?? []
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const assignCandidate = async (candidateId) => {
        try {
            await fetch(`${DEV_URL}/projects/${id}/assigncandidates/${candidateId}`, {
                method: 'POST'
            });
            const assignedCandidates = await fetchAssignedCandidates();
            setAssignedCandidates(assignedCandidates);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!project) return;

    return (
        <View style={[styles.privateContainer]}>
            <View style={{justifyContent: 'center'}}>
                <TouchableOpacity style={{backgroundColor: 'transparent' }} title="<" onPress={() => router.back()}></TouchableOpacity>
                <Text style={styles.headingAlternative}>{project.title}</Text>
            </View>

            <Text style={[styles.subheading, {fontSize: 16, fontWeight: 700, marginBottom: 5}]}>{i18n.t('description')}</Text>
            <Text style={{fontSize: 12, color: '#6B7280'}}>{project.description}</Text>

            <ScrollView style={{marginBottom: 20}}>

                {
                    assignedCandidates && assignedCandidates.length > 0 &&
                    <View style={{marginTop: 15}}>
                        <Text style={[styles.subheading, {fontSize: 16, fontWeight: 700, marginBottom: 5}]}>{i18n.t('assignedCandidates')}</Text>
                        {assignedCandidates.map((candidate, index) => (
                            <TouchableOpacity key={index} style={{marginTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}} onPress={async () => {
                                await Store.saveToken('candidate', JSON.stringify(candidate));
                                await Store.saveToken('projectId', id);
                                router.replace(`/users/${candidate.id}`)
                            }}>
                                <View>
                                    <Text style={{fontSize: 12, fontWeight: 700, marginBottom: 0}}>{candidate.name}</Text>
                                    <Text style={{fontSize: 10, marginBottom: 5}}>{candidate.country} - {candidate.email}</Text>
                                </View>
                                <Pressable style={[styles.projectButton, styles.viewProject]}>
                                    <Text style={{fontSize: 10, color: '#FFF'}}>{i18n.t('seeDetails')}</Text>
                                </Pressable>
                            </TouchableOpacity>
                        ))}
                    </View>
                }

                {
                    candidates && candidates.length > 0 &&
                    <View style={{marginTop: 15}}>
                        <Text style={[styles.subheading, {fontSize: 16, fontWeight: 700, marginBottom: 5}]}>{i18n.t('selectedCandidates')}</Text>
                        {candidates.map((candidate, index) => (
                            <TouchableOpacity key={index} style={{marginTop: 10, flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={{fontSize: 12, fontWeight: 700, marginBottom: 0}}>{candidate.name}</Text>
                                    <Text style={{fontSize: 10, marginBottom: 5}}>{candidate.country} - {candidate.email}</Text>
                                </View>

                                <View>
                                    <Pressable style={[styles.projectButton, styles.viewProject]} onPress={async () => {
                                        await Store.saveToken('projectId', id);
                                        await Store.saveToken('candidate', JSON.stringify(candidate));
                                        router.replace(`/users/${candidate.id}`)
                                    }}>
                                        <Text style={{fontSize: 10, color: '#FFF'}}>{i18n.t('seeDetails')}</Text>
                                    </Pressable>

                                    <Pressable style={[styles.projectButton, styles.viewProject, { marginTop: 10} ]} onPress={async () => assignCandidate(candidate.id)}>
                                        <Text style={{fontSize: 10, color: '#FFF'}}>{i18n.t('assignCandidate')}</Text>
                                    </Pressable>
                                </View>

                            </TouchableOpacity>
                        ))}
                    </View>
                }

                {
                    tests && tests.length > 0 &&
                    <View style={{marginTop: 15}}>
                        <Text style={[styles.subheading, {fontSize: 16, fontWeight: 700, marginBottom: 5}]}>Pruebas</Text>
                        {tests.map((test, index) => (
                            <TouchableOpacity key={index} style={{marginTop: 5, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 12, fontWeight: 700, marginBottom: 10}}>{test.title}</Text>
                                <Text style={{fontSize: 10, color: '#6B7280'}}>{test.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                }
            </ScrollView>
        </View>
    )
}
export default ProjectPage;