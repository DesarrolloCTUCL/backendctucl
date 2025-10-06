import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1759353705653 implements MigrationInterface {
    name = 'MigrationLocal1759353705653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_30a3d1534a7d3d18955e991ec11"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "deviceIdId" TO "device_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_96526adb34aa969626b4aa4635c" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_96526adb34aa969626b4aa4635c"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "device_id" TO "deviceIdId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_30a3d1534a7d3d18955e991ec11" FOREIGN KEY ("deviceIdId") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
