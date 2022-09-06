import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArrivedProducts {
  @PrimaryGeneratedColumn("uuid")
  arrived_product_id: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
  })
  arrived_product_name: string;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  arrived_product_price: string;

  @Column({
    type: "bigint",
    nullable: false,
  })
  arrived_product_count: number;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  arrived_product_amount: string;

  @Column({
    type: "time with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  arrived_product_arrived_date: string;
}
