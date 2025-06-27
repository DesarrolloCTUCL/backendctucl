import { MigrationInterface, QueryRunner } from "typeorm";

export class PassengerCounter751044439749 implements MigrationInterface {
    name = 'PassengerCounter1751044439749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "passenger_counter" ("id" SERIAL NOT NULL, "passengers" integer NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "bus_id" integer, "itinerary_id" integer, CONSTRAINT "PK_b0f31eb9b56cb747b8e2e574686" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD CONSTRAINT "FK_5b32da74090d5193edab8375ccc" FOREIGN KEY ("bus_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD CONSTRAINT "FK_a4eacd89b19823bca6d7276fe3e" FOREIGN KEY ("itinerary_id") REFERENCES "itinerary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP CONSTRAINT "FK_a4eacd89b19823bca6d7276fe3e"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP CONSTRAINT "FK_5b32da74090d5193edab8375ccc"`);
        await queryRunner.query(`DROP TABLE "passenger_counter"`);
    }

}
