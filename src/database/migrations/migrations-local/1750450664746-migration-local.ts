import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750450664746 implements MigrationInterface {
    name = 'MigrationLocal1750450664746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."vehicles_company_enum" AS ENUM('24mayo', 'cuxibamba', 'urbasur', 'urbaexpress')`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("register" integer NOT NULL, "partner" character varying NOT NULL, "dni" character varying NOT NULL, "phone" character varying NOT NULL, "company" "public"."vehicles_company_enum" NOT NULL, "plate" character varying, "operation_status" "public"."vehicles_operation_status_enum" NOT NULL DEFAULT 'inactivo', "grupo" "public"."vehicles_grupo_enum" NOT NULL, "status" boolean NOT NULL DEFAULT true, "user_id" integer, CONSTRAINT "PK_68db9ba3533145163cb478ed54f" PRIMARY KEY ("register"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_88b36924d769e4df751bcfbf249" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_88b36924d769e4df751bcfbf249"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_company_enum"`);
    }

}
