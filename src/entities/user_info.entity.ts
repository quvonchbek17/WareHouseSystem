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

<<<<<<< HEAD
    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    user_full_name: string;
}
=======
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
>>>>>>> 93b94bbc9d7aeabad247bdf225ba06e9053bb862
