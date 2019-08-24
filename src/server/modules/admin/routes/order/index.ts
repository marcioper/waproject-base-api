import { Router } from 'express';
import { authRequired } from 'middlewares/authRequired';

import { list } from './list';

export const router = Router();

router.use(authRequired());

router.get('/', list);
