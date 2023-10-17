import firebase from 'firebase/app';
import jest from 'jest';

jest.mock('firebase/app', () => {
  return {
    auth: jest.fn(),
  };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    // ...other authentication methods you might use
  };
});

jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn(),
    // ...other Firestore methods you might use
  };
});
