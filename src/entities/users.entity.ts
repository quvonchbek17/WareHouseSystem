import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { UserInfo } from "./user_info.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
  })
  user_name: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
  })
  user_password: string;

  @Column({
    type: "int",
    nullable: false,
  })
  user_status: number;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

  @Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
  user_created_at: string;

  @OneToOne(() => UserInfo)
  @JoinColumn()
  user_info: UserInfo;
}
