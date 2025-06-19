import { MigrationInterface, QueryRunner } from "typeorm";

export class DniColumn1750192848868 implements MigrationInterface {
    name = 'DniColumn1750192848868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "dni" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dni"`);
    }

}
