import { IOrder } from 'interfaces/models/order';
import { Order } from 'models/order';
import { Transaction } from 'objection';

export async function findById(id: number): Promise<Order> {
  return await Order.query()
    .where({ id })
    .first();
}

export async function insert(model: IOrder, transaction?: Transaction): Promise<Order> {
  return await Order.query(transaction).insert(<Order>model);
}

export async function update(model: IOrder, transaction?: Transaction): Promise<Order> {
  return await Order.query(transaction).updateAndFetchById(model.id, <Order>model);
}
