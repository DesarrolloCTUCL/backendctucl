import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750450185359 implements MigrationInterface {
    name = 'MigrationLocal1750450185359'

    public async up(queryRunner: QueryRunner): Promise<void> {
      //  await queryRunner.query(`CREATE TYPE "public"."buses_ctucl_company_enum" AS ENUM('24mayo', 'cuxibamba', 'urbasur', 'urbaexpress')`);
   //     await queryRunner.query(`CREATE TYPE "public"."buses_ctucl_operation_status_enum" AS ENUM('inactivo', 'en_ruta', 'reten')`);
     //   await queryRunner.query(`CREATE TYPE "public"."buses_ctucl_grupo_enum" AS ENUM('grupo_1', 'grupo_2')`);
    //    await queryRunner.query(`CREATE TABLE "buses_ctucl" ("register" integer NOT NULL, "partner" character varying NOT NULL, "dni" character varying NOT NULL, "phone" character varying NOT NULL, "company" "public"."buses_ctucl_company_enum" NOT NULL, "plate" character varying, "operation_status" "public"."buses_ctucl_operation_status_enum" NOT NULL DEFAULT 'inactivo', "grupo" "public"."buses_ctucl_grupo_enum" NOT NULL, "status" boolean NOT NULL DEFAULT true, "user_id" integer, CONSTRAINT "PK_286b0580ab17a7c4582e961f75c" PRIMARY KEY ("register"))`);
     //   await queryRunner.query(`ALTER TABLE "buses_ctucl" ADD CONSTRAINT "FK_93775982484dd707958e936e5a4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
     //   await queryRunner.query(`ALTER TABLE "buses_ctucl" DROP CONSTRAINT "FK_93775982484dd707958e936e5a4"`);
      //  await queryRunner.query(`DROP TABLE "buses_ctucl"`);
     //   await queryRunner.query(`DROP TYPE "public"."buses_ctucl_grupo_enum"`);
      //  await queryRunner.query(`DROP TYPE "public"."buses_ctucl_operation_status_enum"`);
      //  await queryRunner.query(`DROP TYPE "public"."buses_ctucl_company_enum"`);
    }

}
