import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RedirectToLogin() {
  const router = useRouter();

  useEffect(() => {
    // Wait for a tick to ensure the navigation container has mounted
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
