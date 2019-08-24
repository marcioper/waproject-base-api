import { IOrder } from 'interfaces/models/order';
import * as joi from 'joi';
import * as lodash from 'lodash';

import { validate } from './order';

describe('app/validators/order', () => {
  const sample: IOrder = {
    id: 1,
    description: 'MacBook Pro 15',
    amount: 1,
    price: 10000
  };

  it('should return valid for a minimun object', async () => {
    const model = { description: sample.description, amount: sample.amount, price: sample.price };
    return expect(validate(model)).toResolve();
  });

  it('should return valid for a full object', async () => {
    const model = sample;
    return expect(validate(model)).toResolve();
  });

  it('should return invalid when id is less than 1', async () => {
    const model = lodash.clone(sample);
    model.id = 0;
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('id');
    expect(data.message[0].type).toEqual('number.min');
  });

  it('should return invalid when description is empty', async () => {
    const model = lodash.clone(sample);
    delete model.description;
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('description');
    expect(data.message[0].type).toEqual('any.required');
  });

  it('should return invalid when description length is less than 3', async () => {
    const model = lodash.clone(sample);
    model.description = 'te';
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('description');
    expect(data.message[0].type).toEqual('string.min');
  });

  it('should return invalid when description length is greather than 150', async () => {
    const model = lodash.clone(sample);
    model.description = new Array(152).join('a');
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('description');
    expect(data.message[0].type).toEqual('string.max');
  });

  it('should return invalid when amount is empty', async () => {
    const model = lodash.clone(sample);
    delete model.amount;
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('amount');
    expect(data.message[0].type).toEqual('any.required');
  });

  it('should return invalid when amount is price', async () => {
    const model = lodash.clone(sample);
    delete model.price;
    const promise = validate(model);
    await expect(promise).toReject();

    const data: joi.CustomValidationError = await promise.catch(err => err);
    expect(data.validationError).toBeTrue();
    expect(data.message).toHaveLength(1);
    expect(data.message[0].path).toEqual('price');
    expect(data.message[0].type).toEqual('any.required');
  });
});
