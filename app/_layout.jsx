import {Redirect, Stack} from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{animation: 'none', headerShown: false}}/>
            <Stack.Screen name="(private)" options={{animation: 'none', headerShown: false}}/>
        </Stack>
    )
}
export default StackLayout;

