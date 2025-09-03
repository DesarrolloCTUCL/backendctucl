import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1756910673231 implements MigrationInterface {
    name = 'MigrationLocal1756910673231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP COLUMN "passengers"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP COLUMN "end_time"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD "timestamp" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD "special" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP COLUMN "special"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD "end_time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD "start_time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD "passengers" integer NOT NULL`);
    }

}
