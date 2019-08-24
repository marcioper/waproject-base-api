import { IOrder } from 'interfaces/models/order';
import { joi, validateAsPromise } from 'validators';

const schema = joi.object().keys({
  id: joi.number().min(1),
  description: joi
    .string()
    .trim()
    .required()
    .min(3)
    .max(150),
  amount: joi.number().required(),
  price: joi.number().required()
});

export function validate(model: any): Promise<IOrder> {
  return validateAsPromise<any>(model, schema);
}
