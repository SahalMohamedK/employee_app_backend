import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressFieldsRenamed1692263028973 implements MigrationInterface {
    name = 'AddressFieldsRenamed1692263028973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line1"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line2"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line2" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line1" character varying NOT NULL DEFAULT ''`);
    }

}
