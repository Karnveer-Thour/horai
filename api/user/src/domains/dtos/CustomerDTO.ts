import { SocialAccount } from '../customer/CustomerEnum';

export class CustomerDTO {
    customerId: string;
    connectedFirebaseId: string;
    email: string;
    socialAccount: SocialAccount;
    bizUserId?: string;
    isBizUser?: boolean;
    bizPayload?: string;

    constructor(
        input: Pick<
            CustomerDTO,
            'customerId' | 'connectedFirebaseId' | 'email' | 'socialAccount' | 'bizUserId' | 'isBizUser' | 'bizPayload'
        >,
    ) {
        Object.assign(this, input);
        this.customerId = input.customerId;
        this.connectedFirebaseId = input.connectedFirebaseId;
        this.email = input.email;
        this.socialAccount = input.socialAccount;
        this.bizUserId = input.bizUserId;
        this.isBizUser = input.isBizUser;
        this.bizPayload = input.bizPayload;
    }
}
