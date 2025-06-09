// 'use client';

// import { useEffect, useState } from 'react';
// import FriendsCard from '../components/FriendsCard';
// import '../app/App.css';
// import { useAuth } from '@/context/authContext';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '@/firebase/firebase';

// function FriendsList() {
//   const { user } = useAuth();
//   const [friends, setFriends] = useState([]);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const fetchFriends = async () => {
//     if (!user?.uid) return;
//     const snapshot = await getDocs(
//       collection(db, 'users', user.uid, 'friends')
//     );
//     const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setFriends(list);
//   };

//   useEffect(() => {
//     fetchFriends();
//   }, [user, refreshTrigger]);

//   // Provide this to FriendsCard so it can trigger re-fetch
//   const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

//   return <FriendsCard friends={friends} onRefresh={triggerRefresh} />;
// }

// export default FriendsList;
