/**
 * @jest-environment node
 */

import supertest from 'supertest';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

const request = supertest(process.env.ENDPOINT || 'http://localhost:3001');
const firebaseApp = firebase.initializeApp({
    projectId: process.env.HORAI_GCP_PROJECT_ID || 'horai-dev-scheme-verge-v2',
    apiKey: process.env.FIREBASE_WEB_API_KEY || 'AIzaSyAl1PpWVBggHRKPq03BdqwO3vrpo_P5iyY',
});
jest.setTimeout(20000);

describe('NonInvasiveServerDoctor', () => {
    test('health check', async () => {
        const userToken = 'test';
        const res = await request
            .get(`/hc`)
            .set('Authorization', `Bearer ${userToken}`)
            .set('Content-type', 'application/json')
            .expect(200);
        expect(res.body).toEqual({ status: 'ok' });
    });
    describe('Consumer on web', () => {
        let token: string;
        test('Login', async () => {
            const user = await login('autotest-user1@example.com', 'testtest');
            token = user.token;
        });
    });
});

const login = async (email: string, password: string): Promise<{ token: string }> => {
    return firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (resUser: UserCredential) => {
            if (!resUser) {
                throw new Error(`userCredential is null`);
            } else if (!resUser.user) {
                throw new Error(`user is null`);
            }
            return { token: await resUser.user.getIdToken() };
        });
};
