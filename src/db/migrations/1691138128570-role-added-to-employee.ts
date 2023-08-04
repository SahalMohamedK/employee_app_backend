import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleAddedToEmployee1691138128570 implements MigrationInterface {
    name = 'RoleAddedToEmployee1691138128570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL DEFAULT 'developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
