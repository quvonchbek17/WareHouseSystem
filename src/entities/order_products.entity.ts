import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
// import { Order } from "./order.entity";
// import { Product } from "./product.entity";

@Entity()
export class order_products {
  @PrimaryGeneratedColumn("uuid")
  order_product_id: string;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  product_price: string;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  product_amount: string;

  @Column({
    type: "varchar",
  })
  product_count: string;

  // @OneToOne(() => Product)
  // @JoinColumn()
  // product_id: Product.product_id;

  // @OneToOne(() => Order)
  // @JoinColumn()
  // order_id: Order.order_id;

  @Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
  order_produc_joined_at: string;
}
