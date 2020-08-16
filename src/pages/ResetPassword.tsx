import {
    IonBackButton, IonButton,
    IonButtons, IonContent, IonHeader,
    IonInput, IonItem,
    IonLabel, IonList,
    IonPage, IonTitle, IonToolbar
} from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../auth";
import "./Form.css";



export const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [, setFormErrors] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try
        {
            await resetPassword(email);
            setEmail("");
            alert("Password reset email sent");
        } catch (e)
        {
            setFormErrors(e.code);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/`} />
                    </IonButtons>
                    <IonTitle>Reset Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="form">
                <form onSubmit={(e) => handleSubmit(e)} action="post">
                    <IonList>
                        <IonItem>
                            <IonLabel>Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onInput={(e) => setEmail(e.currentTarget.value as any)}
                            />
                        </IonItem>
                        <IonButton expand="block" type="submit">Reset Password</IonButton>
                    </IonList>
                </form>
                <div className="below-form">
                    <Link to="/login">Back to login</Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ResetPassword;
