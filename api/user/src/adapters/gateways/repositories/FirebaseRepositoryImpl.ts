import { firebaseAdmin, firebaseAuthApp, FirebaseRepository } from '../../../usecases/repositories/FirebaseRepository';

import { injectable } from 'inversify';

import { RemoteConfigTemplate } from 'firebase-admin/lib/remote-config';
import { IllegalStateError } from '../../../usecases/errors/IllegalStateError';

const getFirbaseCreds = () => {
    let firebasePrivateKey =
        process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
        'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdmdJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLZ3dnZ1NrQWdFQUFvSUJBUUMrRldWY2FnWFNBN3NmXG5VK1lQQUxOcFVBRU9YZGFmWkpia3RFQlhFSjd2NE5GVXJIdm5VdXdHWkFKcDJreGF6Z2p6OTY2WFlmQzVsRWN2XG44dHVKYS9BcGR3aldSTW10ejMrS252Y05zUkU3U2txTVFXSXdmcU5WNDl4QUVoMDlNSW5POTNWejNsZk1iZnlOXG5hNTk1VlNCR2lJOVZkaWRycXNVd3hqTkkxU1pJR0UwUzdsT0ppME9OTmlocnZDQS85VWYyY1k3cERlYmxKbGZLXG5qOXUrSDhLT3hmR0dVNkY2SmJOcFNKUXlsMlprOGtLdnozSi9GZXpGMUVadjh4RXZzcWRBYmx6WW15Y1pkekwwXG5lMG1xTEhScGxxL25PUS9pUERVZmxrc3ZNWkJGOFFRSy9LR2xmMytrODVGVW15TmFRc3lQeEREOFZTbjljQlNhXG5SUmEyNzZVSkFnTUJBQUVDZ2dFQUVHRklvRXVVbjlIcGZKd2V2Wms2WEs5anYraXZONElVRExaSnV4YjRFMFRFXG4xUzZkNk1PNUNoM3hKVTBGK21jNTEwZzNOOTFkUUtpNTc3UldYY082Nk4vVWw1NUs0TnI2S3loaXNyL1k4OHFGXG5uUXQvV2gxM2xzMnhhNllEOWdOcVJMY0hYSXBDOTU5Y3ZaVVNJNE1GNm40WEYrNjhHK2VWNFl1YTNNSmRiNlhlXG5ZOWRrUFBCL09wZ0JEMFVmdzY0VGdLazVtMndGOTdQSytrSFBncFF6TG9tVEpVTXl0R3pEdjBhKzVDZ0JrMHVtXG5wdFpwamc1aTRPdGU2WkF1RkVpK1ZGRko5YlVUcFl3QmdIV2hXU2hSbXgzamYwd0o2dUR5R2N3dnNnUXRudmR5XG5SUEFUSVRVU2lhekE2bWNTNHc4eWFIVm5EdkZPVWEweDI1cVc3THk4bndLQmdRRG1zd3pUNmo1M0lqeFowWTlsXG5KVGl4WkdvNmI5Zmd0M3RyK3FtbVpWV09LSjVteVMxTVRUbVRXT0RxTkJ1R1Uwc1Rwa0ZzRjhoZUsxSEZCdEtZXG5PYnFZditmanVicnpFWEVDdEZvek83VWdKNDVRL0RIT004UVBFVkVENUNNaXIyaisyVjB0TTNFM2JRSWg4bVR3XG5OMy9RSGFLaEpIdFI0RHNYQWUxeEpKeGw2d0tCZ1FEUzdndUVBUmFmTExSc1B6Q0RyTXZtdjRHN0hickhCaFU3XG42RmR6NkM1ZktDMVFMaDVnK25MemIxOEZaL0xEeXNyV2lBdHZURS9OeDRpY0tJRktYUWpITjlzMFlNNXEvUFR3XG5NM25yaVZiUTA3N2RCR09FQUxRcWpoWnVNeHIwbm5BMklmSWlJdkkyTytzK1ZHakdVTXBPOEdJV2pET2hjbmpCXG4wSEM4U2ljZjJ3S0JnUUNsN3E4UlZYQ3NlOEZ3MFJ3VW9oc083S3pEYjJLVXpTUkczRHBkNXBFTStRWkY0L2xpXG40a0RCVExJcGdtVXh6b00zbE9PRmZlMnVYZllvZ3VuQ2QvTlFudWVKa2pOM1ZWbzFtY2N2Qm9rV29aenBmeHZMXG50c3dVRWw1MU1BaGRrRkV5ek9FSisvQTQ3MzBUTWFlTWFEN1VVQnlEVHh3c0hkNGloRTVtalBDNUZRS0JnRmlVXG5ReDNDWHorbFJIZVk2Y1RDVWphckFjNFVwQlZraHBKTDlqM2txV1NvdUs3TlQxQ21uSk9DbDhMcmJsV3UyaFBSXG51Z3VaWG9JcVkwSkErRnJFU3lWdVhZM1hnWmdJZHN4UXNjaXFPbDBrTHlrZDZMVE1udHlvSXQ5UWN1ZDdpZUFSXG56Vjlza1k4WkJxZDhSeXZSVGNSc3lxUnhhRlZLZjAvVk95SzNlVXExQW9HQkFKdVU1Qkh2aFhwWElkOG02MVJsXG5PNkhUeFpSSlI4WUdQRUtlbGM1d1F5ZWxhRXQwb0prSjZUVEswcW0zUllGTE96L0JJZXdHUWRTcWVPUzMvamlWXG5ZRk9udjcvNXZTanRwa1l4bjJFUlVmTE94WXBqSXQ2SkQxWVdVV3hheTFHenl5ZnQxTVJJYTBvVGdFclV6ZmNwXG5aVjJkKzhSV3NkOFRqVk1uSUYreEhabVNcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbg==';

    firebasePrivateKey = Buffer.from(firebasePrivateKey, 'base64').toString('ascii').replace(/\\n/g, '\n');

    const creds = {
        type: process.env.FIREBASE_ADMIN_TYPE || 'service_account',
        project_id: process.env.FIREBASE_ADMIN_PROJECT_ID || 'horai-dev-scheme-verge-v2',
        private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID || 'bbfdc1bd2fd1c7573c8a6b4b3a43846c38e93aef',
        private_key: firebasePrivateKey,
        client_email:
            process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
            'firebase-adminsdk-wqt85@horai-dev-scheme-verge-v2.iam.gserviceaccount.com',
        client_id: process.env.FIREBASE_ADMIN_CLIENT_ID || '109959914973143781786',
        auth_uri: process.env.FIREBASE_ADMIN_AUTH_URL || 'https://accounts.google.com/o/oauth2/auth',
        token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI || 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
            process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
            process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL ||
            'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wqt85%40horai-dev-scheme-verge-v2.iam.gserviceaccount.com',
    };
    const FIREBASE_CREDS = Buffer.from(JSON.stringify(creds)).toString('base64');
    return JSON.parse(Buffer.from(FIREBASE_CREDS, 'base64').toString('ascii'));
};

const adminSdk = firebaseAdmin(getFirbaseCreds());
const firebaseAuth = firebaseAuthApp();

@injectable()
export class FirebaseRepositoryImpl implements FirebaseRepository {
    public getFeatureFlags = async (): Promise<RemoteConfigTemplate> => {
        const remoteConfig = adminSdk.remoteConfig();
        const featureFlags = await remoteConfig.getTemplate();
        return featureFlags;
    };

    public getAllUsers = async (): Promise<any[]> => {
        const usersDocRef = adminSdk.firestore().collection('users');
        const snapshot = await usersDocRef.get();
        const users = snapshot.docs.map((doc) => doc.data());
        return users;
    };

    public deleteUser = async (firebaseId: string): Promise<void> => {
        await adminSdk.auth().deleteUser(firebaseId);
    };

    public checkAndRegisterAuthUser = async (email: string, password: string): Promise<string> => {
        try {
            const userCredential = await firebaseAuth.auth().signInWithEmailAndPassword(email, password);

            if (userCredential && userCredential.user) {
                return userCredential.user.uid;
            }
            throw new IllegalStateError(`User cred not found`);
        } catch (e) {
            const newUserCredential = await firebaseAuth.auth().createUserWithEmailAndPassword(email, password);

            if (!newUserCredential || !newUserCredential.user) {
                throw new IllegalStateError(`Cannot register the customer. Please try again in sometime`);
            }

            await adminSdk.auth().updateUser(newUserCredential.user.uid, {
                emailVerified: true,
            });

            return newUserCredential.user.uid;
        }
    };
}
