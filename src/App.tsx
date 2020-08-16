import {
  IonApp,





  IonPage, IonRouterOutlet
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import Audio from './components/Audio';
import TrackPlayer from './components/TrackPlayer';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import { AppContextProvider } from './State';
import Tabs from './Tabs';
/* Theme variables */
import './theme/variables.css';
import urls from './urls';









const App = () => {
  return (
    <AppContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonPage>
            <IonRouterOutlet>
              <Route path={urls.LOGIN} component={Login} exact={true} />
              <Route path={urls.SIGNUP} component={Signup} exact={true} />
              <Route path={urls.RESET_PASSWORD} component={ResetPassword} exact={true} />
              <Route exact={true} path="/" render={() => <Redirect to={urls.APP_HOME} />} />
            </IonRouterOutlet>
            <Route path="/app" component={Tabs} />
            {/* <Audio /> */}
            <TrackPlayer />
          </IonPage>
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  );
}

export default App;
