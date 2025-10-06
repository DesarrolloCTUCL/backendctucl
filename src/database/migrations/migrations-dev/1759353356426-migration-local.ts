import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1759353356426 implements MigrationInterface {
    name = 'MigrationLocal1759353356426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_b603b9d63beefd65471e3a12412"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "deviceId" TO "deviceIdId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_30a3d1534a7d3d18955e991ec11" FOREIGN KEY ("deviceIdId") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_30a3d1534a7d3d18955e991ec11"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "deviceIdId" TO "deviceId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_b603b9d63beefd65471e3a12412" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
