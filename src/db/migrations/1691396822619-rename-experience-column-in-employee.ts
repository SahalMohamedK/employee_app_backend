import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameExperienceColumnInEmployee1691396822619 implements MigrationInterface {
    name = 'RenameExperienceColumnInEmployee1691396822619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "experiance" TO "experience"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "experience" TO "experiance"`);
    }

}
