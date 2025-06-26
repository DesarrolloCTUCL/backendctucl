import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750860968763 implements MigrationInterface {
    name = 'MigrationLocal1750860968763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "log_gps" ("id" SERIAL NOT NULL, "vehicle_id" character varying NOT NULL, "date" character varying NOT NULL, "time" character varying NOT NULL, "control_point" character varying NOT NULL, "lat" double precision NOT NULL, "long" double precision NOT NULL, "speed" character varying NOT NULL, "itinerary" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c3c004bb8ea261df28e3f11a634" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itinerary" ALTER COLUMN "shift" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "itinerary" ADD CONSTRAINT "FK_495f5d9afb9418c3158890c2d2e" FOREIGN KEY ("shift") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itinerary" DROP CONSTRAINT "FK_495f5d9afb9418c3158890c2d2e"`);
        await queryRunner.query(`ALTER TABLE "itinerary" ALTER COLUMN "shift" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "log_gps"`);
    }

}
