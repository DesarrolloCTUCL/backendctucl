import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750355108799 implements MigrationInterface {
    name = 'MigrationLocal1750355108799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bus_stations" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ADD "lat" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bus_stations" DROP COLUMN "long"`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ADD "long" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bus_stations" DROP COLUMN "long"`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ADD "long" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bus_stations" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ADD "lat" character varying NOT NULL`);
    }

}
