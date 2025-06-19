import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1750192227280 implements MigrationInterface {
    name = 'Create1750192227280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mqtt_command_history" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "command" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "user_id" integer NOT NULL, "path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "topic" character varying NOT NULL, CONSTRAINT "PK_b322e2d8be16f7998b26529b2bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_account_type_enum" AS ENUM('ADMIN', 'STAFF', 'DRIVER', 'PARTNER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "address" character varying, "account_type" "public"."users_account_type_enum" NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, "company_id" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vehicles_operation_status_enum" AS ENUM('inactivo', 'en_ruta', 'en_espera')`);
        await queryRunner.query(`CREATE TYPE "public"."vehicles_grupo_enum" AS ENUM('grupo_1', 'grupo_2')`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "register" character varying NOT NULL, "partner" character varying NOT NULL, "dni" character varying NOT NULL, "phone" character varying NOT NULL, "plate" character varying NOT NULL, "operation_status" "public"."vehicles_operation_status_enum" NOT NULL DEFAULT 'inactivo', "grupo" "public"."vehicles_grupo_enum" NOT NULL, "status" boolean NOT NULL DEFAULT true, "userId" integer, "company_id" integer, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "vehicle_id" character varying NOT NULL, "date" character varying NOT NULL, "itinerary" character varying NOT NULL, "line_id" character varying NOT NULL, "user_id" character varying NOT NULL, "driver" character varying NOT NULL, "observations" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "charging_points" ("id" SERIAL NOT NULL, "business_name" character varying NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "dni" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying, "address" character varying NOT NULL, "device_username" character varying NOT NULL, "device_password" character varying NOT NULL, "lat" double precision NOT NULL, "long" double precision NOT NULL, "description" character varying, "ruc" character varying NOT NULL, "device_id" character varying, "contract" character varying, "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4a551249fd75805b8efa3e92e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."devices_type_enum" AS ENUM('MOBILE_POS', 'X60_POS', 'X600_POS')`);
        await queryRunner.query(`CREATE TABLE "devices" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "serial" character varying NOT NULL, "imei" character varying NOT NULL, "type" "public"."devices_type_enum" NOT NULL, "status" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "charging_point_id" integer, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "intinerary" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "kilometers" double precision NOT NULL, "shift" character varying NOT NULL, "line_id" character varying NOT NULL, "route_id" character varying NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a6985531a1c2343a444d479dbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bus_lines" ("id" SERIAL NOT NULL, "number" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_93d38d41737200fa91744dd45ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bus_line_stations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, "bus_line_id" integer, "bus_station_id" integer, CONSTRAINT "PK_1a2b1f995689afab44be22e3bb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."bus_stations_type_enum" AS ENUM('CONTROL_POINT', 'BUS_STOP', 'TRACK_POINT')`);
        await queryRunner.query(`CREATE TABLE "bus_stations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lat" character varying NOT NULL, "long" character varying NOT NULL, "address" character varying NOT NULL, "route" character varying NOT NULL, "radius" double precision NOT NULL, "type" "public"."bus_stations_type_enum" NOT NULL DEFAULT 'BUS_STOP', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_d016fb04004f8f407e5e0b6948b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mqtt_command_history" ADD CONSTRAINT "FK_d6cfa81bec6d57dc2887648e4af" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_20f139b9d79f917ef735efacb00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_e11ef2dcd880132d31bd9f92c2a" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_0aecff1eca7dfc6323d316b26f7" FOREIGN KEY ("charging_point_id") REFERENCES "charging_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bus_line_stations" ADD CONSTRAINT "FK_c2d9d151c7841adc49a84bee16a" FOREIGN KEY ("bus_line_id") REFERENCES "bus_lines"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bus_line_stations" ADD CONSTRAINT "FK_77c3fc8be887312f147e211b7e3" FOREIGN KEY ("bus_station_id") REFERENCES "bus_stations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bus_line_stations" DROP CONSTRAINT "FK_77c3fc8be887312f147e211b7e3"`);
        await queryRunner.query(`ALTER TABLE "bus_line_stations" DROP CONSTRAINT "FK_c2d9d151c7841adc49a84bee16a"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_0aecff1eca7dfc6323d316b26f7"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_e11ef2dcd880132d31bd9f92c2a"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_20f139b9d79f917ef735efacb00"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
        await queryRunner.query(`ALTER TABLE "mqtt_command_history" DROP CONSTRAINT "FK_d6cfa81bec6d57dc2887648e4af"`);
        await queryRunner.query(`DROP TABLE "bus_stations"`);
        await queryRunner.query(`DROP TYPE "public"."bus_stations_type_enum"`);
        await queryRunner.query(`DROP TABLE "bus_line_stations"`);
        await queryRunner.query(`DROP TABLE "bus_lines"`);
        await queryRunner.query(`DROP TABLE "intinerary"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TYPE "public"."devices_type_enum"`);
        await queryRunner.query(`DROP TABLE "charging_points"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_grupo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_operation_status_enum"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_type_enum"`);
        await queryRunner.query(`DROP TABLE "mqtt_command_history"`);
    }

}
