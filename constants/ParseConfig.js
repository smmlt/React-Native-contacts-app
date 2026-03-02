import Parse from 'parse/react-native.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
    'pJ7UtcZv5Su9CBxxhGrRN2SNJnQk0vbYLD8Jq86g',  // Application ID
    'JwvSgc1vlaZgHNxs63kajv8sUThJx1B5hX2Gte0U'  // JavaScript Key
)

Parse.serverURL = 'https://parseapi.back4app.com'
export default Parse