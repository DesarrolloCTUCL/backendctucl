import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750441362812 implements MigrationInterface {
    name = 'MigrationLocal1750441362812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bus_stations" DROP COLUMN "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bus_stations" ADD "address" character varying NOT NULL`);
    }

}
