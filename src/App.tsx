import { IonApp, IonLoading, IonPage, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import TrackPlayer from './components/TrackPlayer'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Signup from './pages/Signup'
import { useGetAllSongsQuery } from './hooks/useGetSongsQuery'
import { useAppState } from './appState/AppContextProvider'
import Tabs from './Tabs'

/* Theme variables */
import './theme/variables.css'
import urls from './urls'
import { Song } from './appState/state.model'

const cache: { [key: number]: Song[] } = {}

const App = () => {
  const { data, loading } = useGetAllSongsQuery({
    fetchPolicy: 'cache-first',
    variables: {
      limit: 31,
    },
  })
  const [, dispatch, Actions] = useAppState()

  React.useLayoutEffect(() => {
    if (!cache[0] && data?.getAllSongs && data.getAllSongs.songs.length > 0) {
      cache[0] = data.getAllSongs.songs
      dispatch(Actions.addSongs(data.getAllSongs.songs as any))
    }
    //eslint-disable-next-line
  }, [data])

  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <IonLoading isOpen={loading} showBackdrop={true} spinner='crescent' />
          <IonRouterOutlet>
            <Route path={urls.LOGIN} component={Login} exact={true} />
            <Route path={urls.SIGNUP} component={Signup} exact={true} />
            <Route
              path={urls.RESET_PASSWORD}
              component={ResetPassword}
              exact={true}
            />
            <Route
              exact={true}
              path='/'
              render={() => <Redirect to={urls.APP_HOME} />}
            />
          </IonRouterOutlet>
          <Route path='/app' component={Tabs} />
          <TrackPlayer />
        </IonPage>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
