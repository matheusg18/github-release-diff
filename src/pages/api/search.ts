import IApiSearchResponse from '@/typescript/interfaces/IApiSearchResponse';
import type { NextApiRequest, NextApiResponse } from 'next';
import apiAxios from '@/modules/ApiAxios';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IApiSearchResponse[]>) {
  const query = req.query.q;

  const { data } = await apiAxios.get('/search/repositories', {
    params: { q: query },
  });

  const response = (data.items as any[]).map<IApiSearchResponse>((item) => ({
    id: item.id,
    htmlUrl: item.html_url,
    name: item.name,
    fullName: item.full_name,
    description: item.description,
    owner: {
      login: item.owner.login,
      avatarUrl: item.owner.avatar_url,
    },
  }));

  res.status(200).json(response);
}
