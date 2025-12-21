import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1765893740610 implements MigrationInterface {
  name = "Init1765893740610";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Customer table (id, name, email)
    await queryRunner.query(`
      CREATE TABLE "customer" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        CONSTRAINT "PK_customer_id" PRIMARY KEY ("id")
      )
    `);

    // Project table (id, title, status planned/active/done, customerId)
    await queryRunner.query(`
      CREATE TABLE "project" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "status" character varying NOT NULL DEFAULT 'planned',
        "customerId" uuid NOT NULL,
        CONSTRAINT "PK_project_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_project_customer" FOREIGN KEY ("customerId")
          REFERENCES "customer"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}