import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1665738292989 implements MigrationInterface {
    name = 'migrations1665738292989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_213662113ff242f629379d0f676"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "userIdUserId" TO "userUserId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "userUserId" TO "userIdUserId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_213662113ff242f629379d0f676" FOREIGN KEY ("userIdUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
