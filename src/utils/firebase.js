import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { tokenError, loginError } from "./dialog.js"

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu5uo0aifEwC5MluPkBft6kIQ5974oeOY",
  authDomain: "bokashi39.firebaseapp.com",
  projectId: "bokashi39",
  storageBucket: "bokashi39.appspot.com",
  messagingSenderId: "1080230961751",
  appId: "1:1080230961751:web:9cec29ad40895e80b07912",
  measurementId: "G-VTT6CLS2Z2"
};

export class Firebase {
  constructor() {
    initializeApp(firebaseConfig);
  }



  async signIn() {
    return await signInWithPopup(getAuth(), new GoogleAuthProvider());
  }

  async signOut() {
    return await signOut(getAuth());
  }

  async getToken() {
    return new Promise((resolve) => {
      this.onAuth().then((user) => {
        if (user) {
          getAuth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
              resolve(idTokenResult.token);
            })
            .catch(() => {
              tokenError();
            });
        }
        else loginError();
      }).catch(() => {
        loginError();
      })
    })
  }
  // 現在ログインしているユーザーを取得する
  async onAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          resolve(user);
        } else {
          reject();
        }
      });
    })
  }

  async refreshToken() {
    return new Promise(resolve => {
      // ID トークンを取得
      getAuth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          this.token = idTokenResult.token;
          resolve(this.token);
        })
        .catch((error) => {
          console.log(error);
        });
    })
  }
}

export default new Firebase();