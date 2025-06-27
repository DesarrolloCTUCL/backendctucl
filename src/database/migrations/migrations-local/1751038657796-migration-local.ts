import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1751038657796 implements MigrationInterface {
    name = 'MigrationLocal1751038657796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "PK_68db9ba3533145163cb478ed54f"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "PK_8cffcfb95cddc051b2f06f701f5" PRIMARY KEY ("register", "id")`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "PK_8cffcfb95cddc051b2f06f701f5"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_68db9ba3533145163cb478ed54f" UNIQUE ("register")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_68db9ba3533145163cb478ed54f"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "PK_8cffcfb95cddc051b2f06f701f5" PRIMARY KEY ("register", "id")`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "PK_8cffcfb95cddc051b2f06f701f5"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "PK_68db9ba3533145163cb478ed54f" PRIMARY KEY ("register")`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "id"`);
    }

}
