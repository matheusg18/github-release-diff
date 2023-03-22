import type { NextApiRequest, NextApiResponse } from 'next';
import apiAxios from '@/modules/ApiAxios';
import { compare, compareVersions } from 'compare-versions';
import IRelease from '@/typescript/interfaces/IRelease';
import { AxiosResponse } from 'axios';

interface IRawRelease {
  id: number;
  tag_name: string;
  body: string;
}

interface IApiReleaseResponse extends Array<IRawRelease> {}

const getReleases = async (owner: string, name: string, from: string): Promise<IRelease[]> => {
  const PAGE_SIZE = 100;
  const MAX_PAGES = 10;

  let page = 1;
  let releases: IRelease[] = [];
  let response: AxiosResponse<IApiReleaseResponse, any>;

  do {
    response = await apiAxios.get<IApiReleaseResponse>(`/repos/${owner}/${name}/releases`, {
      params: { per_page: PAGE_SIZE, page },
    });

    releases = releases.concat(response.data.map(buildRelease));

    page++;
  } while (response.data.length === PAGE_SIZE && compare(releases[releases.length - 1].tagName, from, '>') && page < MAX_PAGES);

  return releases.sort((a, b) => compareVersions(b.tagName, a.tagName));
};

const buildRelease = (release: IRawRelease): IRelease => ({
  id: release.id,
  tagName: release.tag_name,
  description: release.body,
});

const getReleasesInterval = (releases: IRelease[], from: string, to: string): IRelease[] =>
  releases.filter((release) => compare(release.tagName, from, '>') && compare(release.tagName, to, '<='));

export default async function handler(req: NextApiRequest, res: NextApiResponse<IRelease[]>) {
  const owner = req.query.owner as string;
  const name = req.query.name as string;
  const from = req.query.from as string;
  const to = req.query.to as string;

  const releases = await getReleases(owner, name, from);
  const releasesInterval = getReleasesInterval(releases, from, to);

  res.status(200).json(releasesInterval);
}
