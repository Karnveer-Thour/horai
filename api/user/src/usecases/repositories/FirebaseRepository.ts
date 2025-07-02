import firebase from 'firebase';
import * as admin from 'firebase-admin';
import { RemoteConfigTemplate } from 'firebase-admin/lib/remote-config';

export interface FirebaseRepository {
    getFeatureFlags(): Promise<RemoteConfigTemplate>;
    getAllUsers(): Promise<admin.firestore.DocumentData[]>;
    checkAndRegisterAuthUser(email: string, password: string): Promise<string>;
    deleteUser(firebaseId: string): Promise<void>;
}

export const firebaseAdmin = (cert: string) => {
    return admin.initializeApp({
        credential: admin.credential.cert(cert),
    });
};

export const firebaseAuthApp = () => {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || 'horai-dev-scheme-verge-v2';
    const apiKey = process.env.FIREBASE_WEB_API_KEY || 'AIzaSyAl1PpWVBggHRKPq03BdqwO3vrpo_P5iyY';

    return firebase.initializeApp({
        projectId,
        apiKey,
    });
};
