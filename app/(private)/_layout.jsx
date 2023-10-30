import {Tabs} from 'expo-router';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function HomeLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: 'Home',
                    headerTitle: 'Home',
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="list" size={20} color={color}/>
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarLabel: 'Search',
                    headerTitle: 'Search',
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="search" size={20} color={color}/>
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    headerTitle: 'Profile',
                    tabBarIcon: ({ color, size}) => <FontAwesome5 name="user" size={20} color={color} />
                }}
            />
        </Tabs>
    );
}