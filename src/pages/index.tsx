import IApiSearchResponse from '@/typescript/interfaces/IApiSearchResponse';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { validate } from 'compare-versions';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IApiSearchResponse[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSubmit()) return;

    const { data } = await axios.get('/api/search', { params: { q: query } });
    setResults(data);
  };

  const validateSubmit = () => {
    return validate(from) && validate(to);
  };

  return (
    <>
      <form className="mx-auto mt-20 w-fit" action="" onSubmit={handleSubmit}>
        <div className="mb-8 flex gap-2">
          <input
            type="text"
            className="w-1/4 grow rounded border-2 border-gray-300"
            placeholder="Package"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="text"
            className="w-1/4 rounded border-2 border-gray-300"
            name="from"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            className="w-1/4 rounded border-2 border-gray-300"
            name="to"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button type="submit" className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Search
        </button>
      </form>

      {results.map((result) => (
        <div key={result.fullName}>
          <Link href={`/diff?owner=${result.owner.login}&name=${result.name}&from=${from}&to=${to}`}>{result.fullName}</Link>
        </div>
      ))}
    </>
  );
}
