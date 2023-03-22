import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `bearer ${process.env.GITHUB_API_KEY}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});
