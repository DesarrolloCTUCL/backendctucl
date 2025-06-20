import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750442900661 implements MigrationInterface {
    name = 'MigrationLocal1750442900661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shift" ("id" character varying NOT NULL, "route" character varying NOT NULL, "chainpc" character varying NOT NULL, "times" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shift"`);
    }

}
