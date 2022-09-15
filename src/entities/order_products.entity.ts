import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";

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

  @OneToOne(() => Products)
  @JoinColumn()
  product_id: Products["id"];

  @OneToOne(() => Orders)
  @JoinColumn()
  order_id: Orders["order_id"];

  @Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
  order_produc_joined_at: string;
}
