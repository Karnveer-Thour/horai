import { JWK, JWE, util } from 'node-jose';
import { UnauthorizedError } from './errors/UnauthorizedError';
const key = `
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAmZ0xVunOmxz0i43tL8JdGBoWJwpYoxS3O4cnylCoveI3vEir
dCJ+qmEyZCEA0IsMTm5Flh9iFQUr8VsxmE0CF3ZigRkXhYYRJf9HCvgXlOHoEndl
EsAryMHsVDKDnG5Um3bXiT1DijIhLYDo7oPqyMBmWmdqK6YuIfspdp6WvZPzSx64
AT2aAd2ThsCQdwj6me5DO3rMiiLc6NLoSAsXpTioz/ywO0/BkoikpXzwuPK1X1TD
04KEjSNqgDbI1Wgog5NQ615hX4bfPUnA77URuCLrCiNw6LTUDVDD35dTgjetvlmO
1M3/eteEEAMiuT8xilA3/TxzVCZUN7QiyysuXwIDAQABAoIBABQwMXzPq4R9MLJq
i6J8M8noG8Mzu+Rq443iPFt9cD/MTDDliAryQZ1Yusun/rhpncts+J47L6O9k0Hc
D0+Jx12YBGgdCRdWQEizHP4XDtpVOi+7G0B0mwx+V/XU0bEsWtg3rSnvMEIoRm35
hCNcmO2bQ5hcAPsNkwCKRq+9NehiJip4RFumV4r912d5c0qugowg61YtnQr3cHPD
gwdST51xW4ge/hS7gWd4pyvgUC33O3lJHDBb0WDybCHgSzCWAaXj4Vp/XfzebfLX
opId3fSl6YKiAZAMYqJ8JeC0CzcVyi4GKEgUucV9dNmWIs8QIQDcGnxYz3tn0YFv
dR9sVPECgYEAzutMFN459wngK5PkCYnLotzvjbZzNWbUx+KdcD20xwdhO5zObIin
pPEpnSghzYUB7+ogI+qFu5i0L+LJoViK6wNg8H9Q/dK7eRwjx8Sch/ofuUdS7YJI
4ZiDIqSwv8gfJ3+6wk5nWyD//Mts/YXgPcw5wq3XLZlwBTgePinCcYkCgYEAvg0P
/VjZwHknCRhBtZ3qh2yFseP+m4yglFHajc1dv1caTY+aJrJmxxbzpwY+VbFySfmh
uM27UGhE3z0zstw1TRQUjsco/JWM3kKCZeaSi/xfzhXQaxXgDXpWjPa4Nl1chYlr
/ntBOcoRPUmM8wXtUivZi+pjwvk9R/nweIDorqcCgYAso0IEdnRWwMClZgAZtqpB
dhwPnD56VLaucEq6ffVTwlnNfGRjsY9I2+W4S4IPThQ+52kLlnpHIAgvFGOe9PTz
AgWVnEGioCVlWRa278k85E6Xr7VKG4MRd89CV/jxRoDCCqIFbNiLJjFTHadjgdAA
ROBpCQuUgLdTyOltS6Dw0QKBgQCv+ZJjqMC/yq6Nakt1qoo96QuGYzEewMDzdTNk
d9MlV7bAOIao7CnkkOj9L/fKCytjOeU4JC8cTd/vwVC8fdBQ1ZYPenQGJUexiW4K
gswRGJdxUJuSfEfg0vWPQufhVuNTtqIrmd8Ubnk2AYOkh0lu+7FNL7Q+FeBbZB/4
xIwvIwKBgFUm6Ze+cCCFM76foY4Y8B/N5c59ZNEPjhceZ2O+wDfk3uhB/xsPxksp
PIpSnHg2482Ucb1QQtRr4cZWo4GISuQC1TzJGKa7ll/gNSM6FEe0PZIqORITcNon
KFY4Ya3pzXDIPgzNCit7MKNTdw4C41fZ7+63Nvw0eJSfzVEpAzlI
-----END RSA PRIVATE KEY-----
`;
async function createKeyFromPem() {
    return JWK.asKey(key, 'pem');
}

function decodeJwsToken(sig: any) {
    const tokens = sig.split('.');
    return util.base64url.decode(tokens[1]).toString('utf8');
}

async function decryptJweToken(jweToken: any) {
    const encKey = await createKeyFromPem();
    const decryptor = JWE.createDecrypt(encKey);
    const { payload } = await decryptor.decrypt(jweToken);
    return payload.toString('utf8');
}

export const decryptBizToken = async (biz_authorization_token: any) => {
    try {
        const token = await decryptJweToken(biz_authorization_token);
        const decodedPayload = decodeJwsToken(token);

        return {
            success: true,
            data: { idToken: biz_authorization_token, decryptedToken: token, decodedPayload: decodedPayload },
        };
    } catch (error) {
        throw new UnauthorizedError(`Invalid &BIZ Token`);
    }
};
