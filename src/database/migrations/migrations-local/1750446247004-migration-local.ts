import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1750446247004 implements MigrationInterface {
    name = 'MigrationLocal1750446247004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_0aecff1eca7dfc6323d316b26f7"`);
        await queryRunner.query(`CREATE TABLE "recharge-point" ("id" SERIAL NOT NULL, "business_name" character varying NOT NULL, "name" character varying NOT NULL, "ruc" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying, "address" character varying NOT NULL, "device_username" character varying NOT NULL, "device_password" character varying NOT NULL, "device_id" character varying, "contract" character varying, "lat" double precision NOT NULL, "long" double precision NOT NULL, "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b15cd00bbf7427f7a3d5d710ce8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_0aecff1eca7dfc6323d316b26f7" FOREIGN KEY ("charging_point_id") REFERENCES "recharge-point"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_0aecff1eca7dfc6323d316b26f7"`);
        await queryRunner.query(`DROP TABLE "recharge-point"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_0aecff1eca7dfc6323d316b26f7" FOREIGN KEY ("charging_point_id") REFERENCES "charging_points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
