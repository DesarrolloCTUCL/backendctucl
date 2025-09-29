import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1759155959628 implements MigrationInterface {
    name = 'MigrationLocal1759155959628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "card_code" text NOT NULL, "card_type" text NOT NULL, "card_date" text NOT NULL, "card_time" text NOT NULL, "date" TIMESTAMP NOT NULL, "amount" numeric(10,2) NOT NULL, "balance" numeric(10,2) NOT NULL, "last_balance" numeric(10,2) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "latitude" numeric(10,7), "longitude" numeric(10,7), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itinerary" ALTER COLUMN "km_traveled" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itinerary" ALTER COLUMN "km_traveled" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
