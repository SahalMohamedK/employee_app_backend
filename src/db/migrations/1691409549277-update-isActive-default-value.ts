import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIsActiveDefaultValue1691409549277 implements MigrationInterface {
    name = 'UpdateIsActiveDefaultValue1691409549277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "is_active" DROP DEFAULT`);
    }

}
