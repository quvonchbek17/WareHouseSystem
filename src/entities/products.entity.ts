import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import { Orders } from "./orders.entity";
// import { order_products } from "./order_products.entity";

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

  //   CREATE TABLE products(
  //     product_id uuid not null DEFAULT uuid_generate_v4(),
  //     product_name varchar(64) not null,
  //     product_price varchar(256) not null,
  //     product_count bigint not null,
  //     product_potential_count bigint not null,
  //     product_amount varchar(256) not null
  // );

  //   @OneToMany(() => Photo, (photo) => photo.user)
  //   photos: Photo[];
  //   @OneToMany(() => Photo, (photo) => photo.user)
  //   photos: Photo[];
}
