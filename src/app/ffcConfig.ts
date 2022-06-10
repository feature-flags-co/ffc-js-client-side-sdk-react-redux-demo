import { IOption } from "ffc-js-client-side-sdk/esm/types"


export const flagsDefaultValues: {[key: string]: string} = {
    'hello': 'false'
}

export const option: IOption = {
    secret: "YThmLWRmZjUtNCUyMDIxMDkxNzA3NTYyMV9fMl9fMjJfXzExNl9fZGVmYXVsdF82NTM3Mg==", // replace with your won secret
    anonymous: false,
    user: {
        id: 'my-user',
        userName: 'my user',
        email: '',
        customizedProperties: [
            {
                "name": "sex",
                "value": "male"
            }]
    },
    devModePassword: 'thisisademo'
}
