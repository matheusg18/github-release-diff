import IApiSearchResponse from '@/typescript/interfaces/IApiSearchResponse';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IApiSearchResponse[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.get('/api/search', { params: { q: query } });
    setResults(data);
  };

  return (
    <>
      <h1>Home</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {results.map((result) => (
        <div key={result.fullName}>
          <a href={result.htmlUrl}>{result.fullName}</a>
        </div>
      ))}
    </>
  );
}
