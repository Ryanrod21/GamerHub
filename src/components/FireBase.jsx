// src/components/ExampleComponent.js
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, 'yourCollection'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
};
