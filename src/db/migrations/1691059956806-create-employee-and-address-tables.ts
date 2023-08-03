import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployeeAndAddressTables1691059956806 implements MigrationInterface {
    name = 'CreateEmployeeAndAddressTables1691059956806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "line1" character varying NOT NULL, "pincode" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
