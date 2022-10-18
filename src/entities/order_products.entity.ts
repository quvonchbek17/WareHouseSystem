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
		type: "bigint",
	})
	product_count: number;

	@OneToOne(() => Products)
	@JoinColumn()
	product: Products["id"];

	@OneToOne(() => Orders)
	@JoinColumn()
	order: Orders["order_id"];

	@Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
	order_produc_joined_at: string;
}
