import IApiSearchResponse from '@/typescript/interfaces/IApiSearchResponse';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IApiSearchResponse[]>) {
  const query = req.query.q;

  const { data } = await axios.get('https://api.github.com/search/repositories', {
    params: { q: query },
    headers: {
      Authorization: `bearer ${process.env.GITHUB_API_KEY}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const response = (data.items as any[]).map<IApiSearchResponse>((item) => ({
    htmlUrl: item.html_url,
    name: item.name,
    fullName: item.full_name,
    description: item.description,
    owner: { login: item.owner.login },
  }));

  res.status(200).json(response);
}
