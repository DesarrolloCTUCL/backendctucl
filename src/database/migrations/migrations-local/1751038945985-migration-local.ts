import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1751038945985 implements MigrationInterface {
  name = 'MigrationLocal1751038945985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Eliminar la PK actual (que sigue sobre la columna 'id', ahora renombrada a 'code')
    await queryRunner.query(`ALTER TABLE "itinerary" DROP CONSTRAINT "PK_515a9607ae33d4536f40d60f85e"`);

    // 2. Renombrar 'id' a 'code'
    await queryRunner.query(`ALTER TABLE "itinerary" RENAME COLUMN "id" TO "code"`);

    // 3. Agregar nueva columna 'id' autoincremental
    await queryRunner.query(`ALTER TABLE "itinerary" ADD "id" SERIAL NOT NULL`);

    // 4. Establecer 'id' como nueva clave primaria
    await queryRunner.query(`ALTER TABLE "itinerary" ADD CONSTRAINT "PK_515a9607ae33d4536f40d60f85e" PRIMARY KEY ("id")`);

    // 5. (opcional) Hacer que 'code' sea única
    await queryRunner.query(`ALTER TABLE "itinerary" ADD CONSTRAINT "UQ_code_itinerary" UNIQUE ("code")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir todo en orden inverso
    await queryRunner.query(`ALTER TABLE "itinerary" DROP CONSTRAINT "UQ_code_itinerary"`);
    await queryRunner.query(`ALTER TABLE "itinerary" DROP CONSTRAINT "PK_515a9607ae33d4536f40d60f85e"`);
    await queryRunner.query(`ALTER TABLE "itinerary" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "itinerary" RENAME COLUMN "code" TO "id"`);
    await queryRunner.query(`ALTER TABLE "itinerary" ADD CONSTRAINT "PK_515a9607ae33d4536f40d60f85e" PRIMARY KEY ("id")`);
  }
}
