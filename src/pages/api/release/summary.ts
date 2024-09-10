import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

import IRelease from '@/typescript/interfaces/IRelease';

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function buildSummary(releases: IRelease[]) {
  const response = await openaiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You will get a list of github releases for a given repository. Your task is to make a markdown featuring "what\'s new", "breaking changes".',
      },
      {
        role: 'system',
        content:
          'Start with "Releases Summary", then "what\'s new", "breaking changes". Finish saying if there is need for migration.',
      },
      { role: 'user', content: JSON.stringify(releases) },
    ],
  });

  console.log(getCost(response.usage?.completion_tokens as number, response.usage?.prompt_tokens as number));

  return response.choices[0].message.content;
}

function getCost(completion_tokens: number, prompt_tokens: number) {
  const INPUT_COST_BY_TOKEN = 0.00000015;
  const OUTPUT_COST_BY_TOKEN = 0.0000006;

  return prompt_tokens * INPUT_COST_BY_TOKEN + completion_tokens * OUTPUT_COST_BY_TOKEN;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { releases } = req.body as { releases: IRelease[] };

  const summary = await buildSummary(releases);
  res.status(200).send(summary ?? 'Erro');
}
