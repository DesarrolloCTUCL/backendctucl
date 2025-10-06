import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1759781544731 implements MigrationInterface {
    name = 'MigrationLocal1759781544731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "last_balance"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "last_balance" numeric(10,2) NOT NULL`);
    }

}
