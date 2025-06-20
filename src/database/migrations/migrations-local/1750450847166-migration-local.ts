import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750450847166 implements MigrationInterface {
    name = 'MigrationLocal1750450847166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "dni" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "dni" SET NOT NULL`);
    }

}
