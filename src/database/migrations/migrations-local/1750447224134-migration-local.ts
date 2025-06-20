import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750447224134 implements MigrationInterface {
    name = 'MigrationLocal1750447224134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recharge_point" ALTER COLUMN "device_username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recharge_point" ALTER COLUMN "device_password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recharge_point" ALTER COLUMN "device_password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recharge_point" ALTER COLUMN "device_username" SET NOT NULL`);
    }

}
