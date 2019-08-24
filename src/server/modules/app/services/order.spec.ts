import { connectAndMigrate, Connection } from 'db';
import { IOrder } from 'interfaces/models/order';
import { Order } from 'models/order';

import * as service from './order';

describe('app/services/order', () => {
  let connection: Connection;

  const order: IOrder = {
    id: 2,
    description: 'test' + Date.now(),
    amount: 1,
    price: 10
  };

  beforeAll(async () => (connection = await connectAndMigrate()));
  afterAll(() => connection.destroy());

  it('should create a new order', async () => {
    const data: IOrder = {
      ...order,
      id: null
    };

    return service.save(data).then((order: Order) => {
      expect(order).not.toBeUndefined();
      expect(order.description).not.toBeNull();
      expect(order.description).toBeString();
      expect(order.amount).not.toBeNull();
      expect(order.amount).toBeNumber();
      expect(order.price).not.toBeNull();
      expect(order.price).toBeNumber();
      expect(order.createdDate).toBeDate();
      expect(order.createdDate.getTime()).not.toBeNaN();
    });
  });
});
