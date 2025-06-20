import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750449974500 implements MigrationInterface {
    name = 'MigrationLocal1750449974500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_e11ef2dcd880132d31bd9f92c2a"`);
       // await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6"`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "id"`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "company_id"`);
      //  await queryRunner.query(`CREATE TYPE "public"."vehicles_company_enum" AS ENUM('24mayo', 'cuxibamba', 'urbasur', 'urbaexpress')`);
       // await queryRunner.query(`ALTER TABLE "vehicles" ADD "company" "public"."vehicles_company_enum" NOT NULL`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "PK_68db9ba3533145163cb478ed54f" PRIMARY KEY ("register")`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "plate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      //  await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "plate" SET NOT NULL`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "PK_68db9ba3533145163cb478ed54f"`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "company"`);
      //  await queryRunner.query(`DROP TYPE "public"."vehicles_company_enum"`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" ADD "company_id" integer`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" ADD "id" SERIAL NOT NULL`);
      //  await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id")`);
      // await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_e11ef2dcd880132d31bd9f92c2a" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
