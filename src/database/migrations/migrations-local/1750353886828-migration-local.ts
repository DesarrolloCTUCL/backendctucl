import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750353886828 implements MigrationInterface {
    name = 'MigrationLocal1750353886828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."bus_stations_type_enum" RENAME TO "bus_stations_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."bus_stations_type_enum" AS ENUM('CONTROL_POINT', 'BUS_STOP', 'TRACK_POINT', 'AUTOMATED_STOP')`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ALTER COLUMN "type" TYPE "public"."bus_stations_type_enum" USING "type"::"text"::"public"."bus_stations_type_enum"`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ALTER COLUMN "type" SET DEFAULT 'BUS_STOP'`);
        await queryRunner.query(`DROP TYPE "public"."bus_stations_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bus_stations_type_enum_old" AS ENUM('CONTROL_POINT', 'BUS_STOP', 'TRACK_POINT')`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ALTER COLUMN "type" TYPE "public"."bus_stations_type_enum_old" USING "type"::"text"::"public"."bus_stations_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "bus_stations" ALTER COLUMN "type" SET DEFAULT 'BUS_STOP'`);
        await queryRunner.query(`DROP TYPE "public"."bus_stations_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."bus_stations_type_enum_old" RENAME TO "bus_stations_type_enum"`);
    }

}
