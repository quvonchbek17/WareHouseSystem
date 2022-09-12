import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    order_id: string

    @Column({
        type: 'bigint',
        nullable: false
    })
    order_unique_number: BigInt

    @Column({
        type: 'text',
        nullable: false
    })
    order_description: string

    @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
    ordered_at: string

    @Column({ 
        type: 'time with time zone', 
        nullable: true
    })
    delivered_at: string

    @Column({
        type: 'enum',
        enum: ['accepted', 'expected', 'arrived'],
        default: 'accepted'
    })
    order_status: 'accepted' | 'expected' | 'arrived'

    @OneToOne(() => Users)
    @JoinColumn()
    user_id: Users
}
