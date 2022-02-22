import AesCrypto from 'react-native-aes-kit';
import {sha256} from 'react-native-sha256';

export const encrypt = async (data: any, uID: string) => {
  const stringifiedData = JSON.stringify(data);
  const hash = await sha256(uID); //userID or any unique character which is always same for a user.
  const secretKey = hash.slice(1, 17); //can slice any 16 byte character from 0-32
  const iv = hash.slice(13, 29); //can slice any 16 byte character from 0-32

  let cipher = '';
  await AesCrypto.encrypt(stringifiedData, secretKey, iv)
    .then(res => {
      cipher = res;
    })
    .catch(err => {
      cipher = err.toString();
      //error handler here
    });
  return cipher;
};

export const decrypt = async (encryptedData: string, uID: string) => {
  const hash = await sha256(uID); //same userID or any unique character used to encrypt
  const secretKey = hash.slice(1, 17); //use the same secret key used to encrypt
  const iv = hash.slice(13, 29); //use the same iv used to encrypt

  let data: any;
  await AesCrypto.decrypt(encryptedData, secretKey, iv)
    .then(res => {
      data = res;
    })
    .catch(err => {
      data = err;
      //error handler here
    });
  return JSON.parse(data);
};
