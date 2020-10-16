import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanage1602855172406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'orphanage',
            columns: [
                {
                    name: 'id',
                    type:'integer',
                    unsigned: true,
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment'
                },
                {
                    name:'name',
                    type:'varchar'
                },
                {
                    name:'latitude',
                    type:'decimal',
                    scale:10,
                    precision:2
                },
                {
                    name:'longitude',
                    type:'decimal',
                    scale:10,
                    precision:2
                }, 
                {
                    name: 'about',
                    type:'text'
                },
                {
                    name:'instructions',
                    type:  'text',
                },
                {
                    name:'opening_hours',
                    type:'varchar'
                },
                {
                    name:'open_on_wekeends',
                    type:'boolean'
                }

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanage')
    }

}
