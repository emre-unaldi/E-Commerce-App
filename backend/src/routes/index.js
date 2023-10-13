import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt';

// routes
import auth from './auth.js';
import product from './product';
import order from './order';

const router = Router();

router.get('/', (req, res) => {
  res.end('Server is already localhost:4000');
});

router.use('/auth', auth);
router.use('/product', product);
router.use('/order', verifyAccessToken, order);

export default router;
