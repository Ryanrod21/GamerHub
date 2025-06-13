import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/authContext';

export function useFriendRequestsCount() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setCount(0);
      return;
    }

    const ref = collection(db, 'users', user.uid, 'friendRequests');
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [user]);

  return count;
}
