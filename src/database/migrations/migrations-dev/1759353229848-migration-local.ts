import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1759353229848 implements MigrationInterface {
    name = 'MigrationLocal1759353229848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_0aecff1eca7dfc6323d316b26f7"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "charging_point_id"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "deviceId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_b603b9d63beefd65471e3a12412" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_b603b9d63beefd65471e3a12412"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "deviceId"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "charging_point_id" integer`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_0aecff1eca7dfc6323d316b26f7" FOREIGN KEY ("charging_point_id") REFERENCES "recharge_point"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
