import { Entity, OneToOne, JoinColumn, Column, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn("uuid")
  user_info_id: string;

  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
  })
  user_phone_number: string;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  user_full_name: string;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;
}
