import { Router } from 'express';
import { createUser, getUserByWallet, getUserByUsername } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/wallet/:walletAddress', getUserByWallet);
router.get('/username/:username', getUserByUsername);

export default router;
