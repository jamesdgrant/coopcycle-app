import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as TaskManager from 'expo-task-manager';

import App from './src/App';
import bgMessaging from './src/notifications/bgMessaging';

// @see https://rnfirebase.io/messaging/usage#background-application-state

messaging().setBackgroundMessageHandler(bgMessaging);

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

TaskManager.defineTask('location-updates', ({ data: { locations }, error }) => {

  if (error) {
    // check `error.message` for more details.
    return;
  }

  console.log('Received new locations', locations);
})

AppRegistry.registerComponent('CoopCycle', () => App);
