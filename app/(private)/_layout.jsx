import {Tabs} from 'expo-router';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function HomeLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Proyectos',
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="list" size={20} color={color}/>
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Search',
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="search" size={20} color={color}/>
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="user" size={20} color={color}/>
                }}
            />
            <Tabs.Screen name="projects/[id]" options={{ headerShown: false, href: null }} />
            <Tabs.Screen name="projects/create" options={{ headerShown: false, href: null }} />
            <Tabs.Screen name="users/[id]" options={{ headerShown: false, href: null }} />
        </Tabs>
    );
}