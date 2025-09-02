import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1756845197225 implements MigrationInterface {
    name = 'MigrationLocal1756845197225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP CONSTRAINT "FK_a4eacd89b19823bca6d7276fe3e"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD CONSTRAINT "FK_a4eacd89b19823bca6d7276fe3e" FOREIGN KEY ("itinerary_id") REFERENCES "itinerary"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger_counter" DROP CONSTRAINT "FK_a4eacd89b19823bca6d7276fe3e"`);
        await queryRunner.query(`ALTER TABLE "passenger_counter" ADD CONSTRAINT "FK_a4eacd89b19823bca6d7276fe3e" FOREIGN KEY ("itinerary_id") REFERENCES "itinerary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
