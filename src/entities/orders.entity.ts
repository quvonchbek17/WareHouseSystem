import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    order_id: string

    @Column({
        type: 'number',
        nullable: false
    })
    order_unique_number: number

    @Column({
        type: 'number',
        nullable: false
    })
    order_description: number

    @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
    ordered_at: string

    @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESPAMP'})
    delivered_at: string

    @Column('enum')
    order_status: 'accepted' | 'expected' | 'arrived'

    @OneToOne(() => Users)
    @JoinColumn()
    user_id: Users
}