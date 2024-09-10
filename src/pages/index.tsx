import IApiSearchResponse from '@/typescript/interfaces/IApiSearchResponse';
import axios from 'axios';
import { useState } from 'react';
import { validate } from 'compare-versions';
import RepoCard from '@/components/RepoCard';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IApiSearchResponse[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await axios.get('/api/search', { params: { q: query } });
    setResults(data);
  };

  const validateSubmit = () => {
    return validate(from) && validate(to);
  };

  const handleCardClick = (name: string, ownerName: string) => {
    if (!validateSubmit()) return;

    router.push({ pathname: '/diff', query: { from, to, name, owner: ownerName } });
  };

  return (
    <main>
      <form className="mx-auto mt-20 flex w-2/5 gap-10" onSubmit={handleSubmit}>
        <input
          type="text"
          className="grow rounded border-2 border-gray-300 px-5 py-2"
          placeholder="Axios"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-8 font-bold text-white transition-colors hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="mx-auto mt-10 flex w-fit gap-10">
        <label htmlFor="from" className="flex items-center gap-4">
          <span className="font-bold">From:</span>
          <input
            type="text"
            className="w-24 grow rounded border-2 border-gray-300 px-3 py-1"
            id="from"
            name="from"
            placeholder="v0.21.1"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>

        <label htmlFor="to" className="flex items-center gap-4">
          <span className="font-bold">To:</span>
          <input
            type="text"
            className="w-24 grow rounded border-2 border-gray-300 px-3 py-1"
            id="to"
            name="to"
            placeholder="v1.3.4"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
      </div>

      <section className="mx-auto my-40 grid w-fit grid-cols-4 gap-10">
        {results.map((result) => (
          <RepoCard
            key={result.id}
            avatarImage={result.owner.avatarUrl}
            name={result.name}
            ownerName={result.owner.login}
            description={result.description}
            handleClick={() => handleCardClick(result.name, result.owner.login)}
          />
        ))}
      </section>
    </main>
  );
}
