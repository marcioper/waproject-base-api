import { NextFunction, Request, Response } from 'express';

import * as orderService from '../../services/order';
import * as orderValidator from '../../validators/order';

export async function save(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await orderValidator.validate(req.body);
    const order = await orderService.save(model);
    res.status(model.id ? 200 : 201).json(order);
  } catch (err) {
    next(err);
  }
}
