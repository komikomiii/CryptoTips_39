import { Router } from 'express';
import { createTip, getTipsByUser, getTipsByRecipient } from '../controllers/tipController';

const router = Router();

router.post('/', createTip);
router.get('/user/:walletAddress', getTipsByUser);
router.get('/received/:walletAddress', getTipsByRecipient);

export default router;
