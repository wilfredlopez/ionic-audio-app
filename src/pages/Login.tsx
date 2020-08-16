import {
    IonBackButton,
    IonButton, IonButtons,
    IonContent, IonHeader,
    IonInput, IonItem,
    IonLabel, IonList,
    IonLoading, IonPage, IonTitle, IonToolbar
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { login } from "../auth";
import { AppContext, ActionCreators } from "../State";
import urls from "../urls";
import "./Form.css";





const Login = () => {
    const { dispatch } = useContext(AppContext);
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setFormErrors] = useState(null);
    const [showLoading, setShowLoading] = useState(false);

    const formRef = useRef(null);

    const goTo = (path: string) => {
        history.push(path, { direction: "forward" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try
        {
            setShowLoading(true);

            const user = await login(email, password);

            dispatch(ActionCreators.loggedIn(user));

            history.replace(urls.APP_HOME);

            setShowLoading(false);
        } catch (e)
        {
            console.error(e);
            setShowLoading(false);
            setFormErrors(e);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/`} />
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="form">
                <IonLoading
                    isOpen={showLoading}
                    message="Logging in..."
                    onDidDismiss={() => setShowLoading(false)}
                />
                <form onSubmit={handleSubmit} method="post" ref={formRef} action="">
                    <IonList>
                        <IonItem>
                            <IonLabel position={"fixed"}>Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onInput={(e) => setEmail(e.currentTarget.value as any)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position={"fixed"}>Password</IonLabel>
                            <IonInput
                                type="password"
                                value={password}
                                onInput={(e) => setPassword(e.currentTarget.value as any)}
                            />
                        </IonItem>
                        <IonButton expand="block" type="submit">Log in</IonButton>
                    </IonList>
                </form>
                <div className="below-form">
                    <a
                        className="create"
                        href="#/"
                        onClick={(e) => {
                            e.preventDefault();
                            goTo("/signup");
                        }}
                    >
                        Create account instead
          </a>
                    <a
                        href="#/"
                        onClick={(e) => {
                            e.preventDefault();
                            goTo("/reset-password");
                        }}
                    >
                        Forgot your password?
          </a>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
