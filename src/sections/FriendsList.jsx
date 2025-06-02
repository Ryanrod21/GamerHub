'use client';

import { useState } from 'react';
import FriendsCard from '../components/FriendsCard';

import '../app/App.css';

import { useAuth } from '@/context/authContext';

function FriendsList({ ProfileData }) {
  const { user, userLoggedIn, loading } = useAuth();

  return (
    <>
      <FriendsCard ProfileData={ProfileData} />
    </>
  );
}

export default FriendsList;
