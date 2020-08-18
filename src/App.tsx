import {
  IonApp,
  IonPage, IonRouterOutlet
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import TrackPlayer from './components/TrackPlayer';
import { useGetAllSongsQuery } from './hooks/useGetSongsQuery';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import { useAppState } from './appState/AppContextProvider';
import Tabs from './Tabs';

/* Theme variables */
import './theme/variables.css';
import urls from './urls';


const App = () => {
  const { data } = useGetAllSongsQuery({
    variables: {
      limit: 31
    }
  })
  const [, dispatch, Actions] = useAppState()


  React.useLayoutEffect(() => {
    if (data?.getAllSongs && data.getAllSongs.songs.length > 0)
    {
      dispatch(Actions.addSongs(data.getAllSongs.songs as any))
    }
    //eslint-disable-next-line
  }, [data])

  return (
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
          <TrackPlayer />
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
