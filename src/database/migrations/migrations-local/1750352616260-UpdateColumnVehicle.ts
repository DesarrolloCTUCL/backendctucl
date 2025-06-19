import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnVehicle1750352616260 implements MigrationInterface {
    name = 'UpdateColumnVehicle1750352616260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_20f139b9d79f917ef735efacb00"`);
        await queryRunner.query(`ALTER TABLE "vehicles" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_88b36924d769e4df751bcfbf249" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_88b36924d769e4df751bcfbf249"`);
        await queryRunner.query(`ALTER TABLE "vehicles" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_20f139b9d79f917ef735efacb00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
