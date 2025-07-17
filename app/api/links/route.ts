import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const links = await prisma.link.findMany();
    res.status(200).json(links);
  } else if (req.method === 'POST') {
    const { title, url, description, tags, user } = req.body;
    const newLink = await prisma.link.create({
      data: {
        title,
        url,
        description,
        tags,
        user, // Make sure 'user' is provided in req.body and matches the expected type
      },
    });
    res.status(201).json(newLink);
  }
}
