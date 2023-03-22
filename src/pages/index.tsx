import IApiSearchResponse from '@/typescript/interfaces/IApiSearchResponse';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IApiSearchResponse[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.get('/api/search', { params: { q: query } });
    setResults(data);
  };

  return (
    <>
      <h1>Home</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Package" value={query} onChange={(e) => setQuery(e.target.value)} />
        <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {results.map((result) => (
        <div key={result.fullName}>
          <Link href={`/diff?owner=${result.owner.login}&name=${result.name}&from=${from}&to=${to}`}>{result.fullName}</Link>
        </div>
      ))}
    </>
  );
}
