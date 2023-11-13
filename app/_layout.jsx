import {Redirect, Stack} from "expo-router";
import ProjectPage from "./(private)/projects/[id]";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{animation: 'none', headerShown: false}}/>
            <Stack.Screen name="(private)" options={{animation: 'none', headerShown: false}}/>
            {/*<Stack.Screen name="private/projects" options={{animation: 'none', headerShown: false}}/>*/}
        </Stack>
    )
}
export default StackLayout;

