import {Redirect} from "expo-router";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();//Hide all warning notifications on front-end

const StartPage = () => {
    // return <Redirect href="/(private)/projects" />;
    // return <Redirect href="/(auth)/login" />;
    return <Redirect href="/(private)/home" />;
}
export default StartPage;