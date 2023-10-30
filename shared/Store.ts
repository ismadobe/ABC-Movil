import AsyncStorage from '@react-native-async-storage/async-storage';

class Store {
    // Save token to AsyncStorage
    static async saveToken(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    }

    // Retrieve token from AsyncStorage
    static async getToken(key: string) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error('Error retrieving token:', error);
            return null;
        }
    }

    // Remove token from AsyncStorage
    static async removeToken(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing token:', error);
        }
    }
}

export default Store;