import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Products {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
  })
  product_name: string;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  product_price: string;

  @Column({
    type: "bigint",
    nullable: false,
  })
  product_count: number;

  @Column({
    type: "bigint",
    nullable: false,
  })
  product_potential_count: number;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  product_amount: string;
}
