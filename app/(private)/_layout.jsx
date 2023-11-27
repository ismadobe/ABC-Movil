import {Tabs} from 'expo-router';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import i18n from "../../translations/i18n";
import {useEffect, useState} from "react";
import Store from "../../shared/Store";

export default function HomeLayout() {
    const [searchBarUrl, setSearchBarUrl] = useState(null);

    useEffect(() => {
        async function getUser() {
            const user = await Store.getToken('user');
            const searchBarUrl = JSON.parse(user).type === 'users' ? null : '/search';
            setSearchBarUrl(searchBarUrl);
        }
        getUser();
    }, []);

    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarLabel: `${i18n.t('projects')}`,
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="list" size={20} color={color}/>
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarLabel: `${i18n.t('search')}`,
                    href: searchBarUrl,
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="search" size={20} color={color}/>
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarLabel: `${i18n.t('settings')}`,
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="user" size={20} color={color}/>
                }}
            />
            <Tabs.Screen name="projects/[id]" options={{ headerShown: false, href: null }} />
            <Tabs.Screen name="projects/create" options={{ headerShown: false, href: null }} />
            <Tabs.Screen name="users/[id]" options={{ headerShown: false, href: null }} />
        </Tabs>
    );
}