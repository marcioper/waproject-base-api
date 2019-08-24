import { Router } from 'express';
// import { authRequired } from 'middlewares/authRequired';

import { save } from './save';

export const router = Router({ mergeParams: true });

// router.use(authRequired());
router.post('/', save);
