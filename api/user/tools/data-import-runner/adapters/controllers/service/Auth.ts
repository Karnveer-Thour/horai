import firebase from 'firebase';

export class Auth {
    static login = async (email: string, password: string): Promise<string> => {
        const projectId = process.env.PROJECT_ID || 'horai-dev-scheme-verge-v2';

        const firebaseApp =
            firebase.apps.length <= 0
                ? firebase.initializeApp({
                      projectId,
                      apiKey: process.env.FIREBASE_WEB_API_KEY || 'AIzaSyAl1PpWVBggHRKPq03BdqwO3vrpo_P5iyY',
                  })
                : firebase.app();

        const resUser = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
        if (!resUser?.user) throw new Error(`Invalid user credentials`);

        const token = await resUser.user.getIdToken();

        return token;
    };
}
