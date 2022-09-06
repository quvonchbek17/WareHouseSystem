import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
 export class delivered_products {
     @PrimaryGeneratedColumn('uuid')
     delivered_product_id:string;

     @Column({
        type: 'varchar',
        length: 64,
        nullable: false
     })
     delivered_product_name:string
    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    delivered_product_price:string
    @Column({
        type: 'bigint',
        nullable: false
    })
    delivered_product_count: bigint

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    delivered_product_amount: string
    @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
    delivered_product_delivered_date: string
 }