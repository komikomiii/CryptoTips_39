import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createTip = async (req: Request, res: Response) => {
  try {
    const { fromAddress, toAddress, amount, message, txHash } = req.body;

    if (!fromAddress || !toAddress || !amount || !txHash) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const tip = await prisma.tip.create({
      data: {
        fromAddress,
        toAddress,
        amount,
        message,
        txHash,
      },
    });

    res.status(201).json(tip);
  } catch (error) {
    console.error('Error creating tip:', error);
    res.status(500).json({ error: 'Failed to create tip' });
  }
};

export const getTipsByUser = async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;

    const tips = await prisma.tip.findMany({
      where: {
        OR: [
          { fromAddress: walletAddress },
          { toAddress: walletAddress },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        fromUser: true,
        toUser: true,
      },
    });

    res.json(tips);
  } catch (error) {
    console.error('Error fetching tips:', error);
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
};

export const getTipsByRecipient = async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;

    const tips = await prisma.tip.findMany({
      where: { toAddress: walletAddress },
      orderBy: { createdAt: 'desc' },
      include: {
        fromUser: true,
      },
    });

    res.json(tips);
  } catch (error) {
    console.error('Error fetching tips:', error);
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
};
