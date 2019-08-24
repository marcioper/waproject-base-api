import { IOrder } from 'interfaces/models/order';
import { IPaginationParams } from 'interfaces/pagination';
import { Order } from 'models/order';
import { Page, Transaction } from 'objection';

export async function list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
  let query = Order.query(transaction)
    .select('*')
    .page(params.page, params.pageSize);

  if (params.orderBy) {
    query = query.orderBy(params.orderBy, params.orderDirection);
  }

  return await query;
}

export async function count(transaction?: Transaction): Promise<Number> {
  const result: any = await Order.query(transaction)
    .count('id as count')
    .first();

  return Number(result.count);
}

export async function findById(id: number, transaction?: Transaction): Promise<Order> {
  return await Order.query(transaction)
    .where({ id })
    .first();
}

export async function insert(model: IOrder, transaction?: Transaction): Promise<Order> {
  return await Order.query(transaction).insert(model);
}

export async function update(model: IOrder, transaction?: Transaction): Promise<Order> {
  return await Order.query(transaction).updateAndFetchById(model.id, <Order>model);
}

export async function remove(id: number, transaction?: Transaction): Promise<void> {
  await Order.query(transaction)
    .del()
    .where({ id });
}
