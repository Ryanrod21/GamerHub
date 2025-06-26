import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import { auth } from './firebase';

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doDeleteAccount = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      await deleteUser(user);
      console.log('User account deleted successfully.');
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        console.error('Reauthentication required before deleting account.');
      } else {
        console.error('Error deleting user:', error.message);
      }
    }
  } else {
    console.error('No user is signed in.');
  }
};

export const doSignInUserWithEmailAndPassword = async (
  auth,
  email,
  password
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

export const doEmailchange = (email) => {
  return updateEmail(auth.currentUser, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
