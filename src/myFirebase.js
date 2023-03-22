import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLBAlPuEvDhiYkMlnLQ9P0fKmqf-P8UoE",
  authDomain: "filmoteka-f9ce2.firebaseapp.com",
  projectId: "filmoteka-f9ce2",
  storageBucket: "filmoteka-f9ce2.appspot.com",
  messagingSenderId: "921137797726",
  appId: "1:921137797726:web:e91c99d3b903f9cbd532cf",
  measurementId: "G-3X347TPLWL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const usersRef = collection(db, 'users');

export const getUserRef = userId => doc(getFirestore(app), 'users', userId);
export const getWachedListRef = uid => collection(db, `users/${uid}/wachedList`);
export const getQueueListRef = uid => collection(db, `users/${uid}/queueList`);

export const setUser = async data => {
  await setDoc(doc(usersRef, data.uid), data);
};

export const updateUser = async (data, id) => {
  await updateDoc(doc(usersRef, id), data);
};

export const addingFilmToWachedList = async ({ data, uid, filmId }) => {
  await setDoc(doc(getWachedListRef(uid), filmId), data);
};

export const deleteFilmFromWachedList = async (uid, filmId) => {
  await deleteDoc(getWachedListRef(uid, filmId));
};

export const addingFilmToQueueList = async ({ data, uid, filmId }) => {
  await setDoc(doc(getQueueListRef(uid), filmId), data);
};

export const deleteFilmFromQueueList = async (uid, filmId) => {
  await deleteDoc(getQueueListRef(uid, filmId));
};