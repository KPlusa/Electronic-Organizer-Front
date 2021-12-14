import AsyncStorage from '@react-native-async-storage/async-storage';

export async function StoreData(key, value) {
  try {
    //const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
}
export async function GetData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    // if(!jsonValue){
    //     return null;
    // }
    return value;
    //console.log(value);
   
  } catch (e) {
  }
  
}

export async function RemoveData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  //console.log('Done.');
}
