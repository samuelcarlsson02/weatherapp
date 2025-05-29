// This API route handles search requests to the Pexels API
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function search(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = req.query.query;
        const apiKey = process.env.PEXELS_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "PEXELS_API_KEY is not set in environment variables" });
        }
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
            method: "GET",
            headers: {
                Authorization: apiKey,
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Failed to fetch data from Pexels API: ${response.statusText}` });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}