import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750685233936 implements MigrationInterface {
    name = 'MigrationLocal1750685233936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "bus_id"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "dispatcher"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "vehicle_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "user_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "vehicle_id"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "dispatcher" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "bus_id" character varying NOT NULL`);
    }

}
