export const hcGET = () =>
    new Promise(async (resolve, reject) => {
        resolve({ payload: { status: 'ok' }, code: 200 });
    });
