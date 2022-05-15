// Add the Firebase products that you want to use
import { getFirestore } from 'firebase/firestore/lite'
import { initializeApp } from 'firebase/app'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBzKK8bjf_6B1DJ7n9LZpH9YCsX7gt6xaU',
  authDomain: 'nbn-hr.firebaseapp.com',
  projectId: 'nbn-hr',
  storageBucket: 'nbn-hr.appspot.com',
  messagingSenderId: '1001017605502',
  appId: '1:1001017605502:web:0aacb3fe65304aa6d9c72f',
  measurementId: 'G-5E48XZ0PRS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
