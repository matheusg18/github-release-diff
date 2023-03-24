import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IRelease from '@/typescript/interfaces/IRelease';
import ReleaseBox from '@/components/ReleaseBox';

export default function Diff() {
  const [releases, setReleases] = useState<IRelease[]>([]);

  const router = useRouter();
  const { owner, name, from, to } = router.query;

  useEffect(() => {
    if (owner && name && from && to) {
      axios.get('/api/release', { params: { owner, name, from, to } }).then((res) => {
        setReleases(res.data);
      });
    }
  }, [owner, name, from, to]);

  return (
    <>
      <h1 className="text-center text-4xl">{name}</h1>
      <h2 className="text-center text-2xl">{`Diff from v${from} to v${to}`}</h2>

      {releases.length === 0 && <p>Loading...</p>}
      {releases.length > 0 && (
        <div className="mx-auto w-5/6">
          {releases.map((release) => (
            <ReleaseBox key={release.id} release={release} />
          ))}
        </div>
      )}
    </>
  );
}
