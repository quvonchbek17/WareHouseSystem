import {
	Column,
	Entity,
	Generated,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { order_products } from "./order_products.entity";

import { Users } from "./users.entity";

@Entity()
export class Orders {
	@PrimaryGeneratedColumn("uuid")
	order_id: string;

	@Generated("increment")
	order_unique_number: number;

	@Column({
		type: "text",
		nullable: false
	})
	order_description: string;

	@Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
	ordered_at: string;

	@Column({
		type: "time with time zone",
		nullable: true,
	})
	delivered_at: string;

	@Column({
		type: "enum",
		enum: ["accepted", "expected", "arrived"],
		default: "accepted",
	})
	order_status: "accepted" | "expected" | "arrived";

	@OneToOne(() => Users)
	@JoinColumn()
	user: Users;

	@OneToMany(() => order_products, (op) => op.order)
	@JoinColumn()
	order_products: order_products
}
