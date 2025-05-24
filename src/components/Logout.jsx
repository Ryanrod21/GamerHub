import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase'; // adjust path if needed
import { useRouter } from 'next/navigation';
import '../app/App.css';

function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button className="Logout" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
