import type { NextApiRequest, NextApiResponse } from 'next';

const query = `
  query NewQuery {
    hadithBy(hadithId: 4299) {
      title
      news_tickers {
        newsTicker {
          title
          info
        }
      }
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = await fetch( "https://zamzamwelfaretrust.com/graphql", {
      method: "POST",
      mode: 'no-cors',
      next: { revalidate: 60 },
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    }
  );

  const { data } = await response.json();

    res.status(200).json({ tickers : data});
  } catch (error) {
    console.error('Error fetching news tickers:', error);
    res.status(500).json({ error: 'Failed to fetch news tickers' });
  }
}
