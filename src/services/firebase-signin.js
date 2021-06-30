import firebase from "firebase";

export const googleLogin = async () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  return await firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */

      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const facebookLogin = async () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  return await firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */

      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const logout = async () => {
  return await firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.

      return { success: "Signed Out" };
    })
    .catch((error) => {
      return error;
      // An error happened.
    });
};
