import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressColumnsAdded1691386000815 implements MigrationInterface {
    name = 'AddressColumnsAdded1691386000815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line1" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line2" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "pincode" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "pincode" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL`);
    }

}
