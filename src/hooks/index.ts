import { useRouter } from 'next/navigation';

export function useGoBack() {
  const router = useRouter();
  return () => router.back();
}
