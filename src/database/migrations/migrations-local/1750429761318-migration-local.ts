import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750429761318 implements MigrationInterface {
    name = 'MigrationLocal1750429761318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itinerary" ("id" character varying NOT NULL, "route" character varying NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "itinerary" character varying NOT NULL, "km_traveled" character varying NOT NULL, "shift" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_515a9607ae33d4536f40d60f85e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "itinerary"`);
    }

}
