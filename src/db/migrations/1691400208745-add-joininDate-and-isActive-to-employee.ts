import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoininDateAndIsActiveToEmployee1691400208745 implements MigrationInterface {
    name = 'AddJoininDateAndIsActiveToEmployee1691400208745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "is_active" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
    }

}
