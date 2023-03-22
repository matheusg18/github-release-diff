import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Diff() {
  const router = useRouter();
  const { owner, name, from, to } = router.query;

  useEffect(() => {
    if (owner && name && from && to) {
      axios.get('/api/release', { params: { owner, name, from, to } }).then((res) => {
        console.log(res.data);
      });
    }
  }, [owner, name, from, to]);

  return (
    <>
      <h1>Diff</h1>
    </>
  );
}
