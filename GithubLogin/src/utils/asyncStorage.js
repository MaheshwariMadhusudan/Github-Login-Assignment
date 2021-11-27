import AsyncStorage from '@react-native-async-storage/async-storage';

// function to set single key in async storage
export const setAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    /* empty */
  }
};

// for getting the key from async storage
export const getAsyncStorage = async key => {
  let data = null;
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      data = JSON.parse(value);
    }
  } catch (error) {
    /* empty */
  }
  return data;
};

// clearing out the async storage
export const clearAsyncStorage = async success => {
  try {
    await AsyncStorage.clear(success);
  } catch (error) {
    /* empty */
  }
};
