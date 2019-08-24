import { IOrder } from 'interfaces/models/order';
import { Model } from 'objection';

export class Order extends Model implements IOrder {
  public id: number;
  public description: string;
  public amount: number;
  public price: number;

  public createdDate: Date;
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Order';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $parseDatabaseJson(json: any): any {
    json.createdDate = json.createdDate ? new Date(json.createdDate) : null;
    json.updatedDate = json.updatedDate ? new Date(json.updatedDate) : null;
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

  public $formatJson(data: IOrder): IOrder {
    return data;
  }
}
