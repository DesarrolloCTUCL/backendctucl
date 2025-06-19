import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnVehicle1750352119096 implements MigrationInterface {
    name = 'UpdateColumnVehicle1750352119096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "register"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "register" integer NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."vehicles_operation_status_enum" RENAME TO "vehicles_operation_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."vehicles_operation_status_enum" AS ENUM('inactivo', 'en_ruta', 'reten')`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "operation_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "operation_status" TYPE "public"."vehicles_operation_status_enum" USING "operation_status"::"text"::"public"."vehicles_operation_status_enum"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "operation_status" SET DEFAULT 'inactivo'`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_operation_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."vehicles_operation_status_enum_old" AS ENUM('inactivo', 'en_ruta', 'en_espera')`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "operation_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "operation_status" TYPE "public"."vehicles_operation_status_enum_old" USING "operation_status"::"text"::"public"."vehicles_operation_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "operation_status" SET DEFAULT 'inactivo'`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_operation_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."vehicles_operation_status_enum_old" RENAME TO "vehicles_operation_status_enum"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "register"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "register" character varying NOT NULL`);
    }

}
