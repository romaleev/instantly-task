import _knex from 'knex'

const knex = _knex({
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite',
    },
});

async function createTable() {
    const exists = await knex.schema.hasTable('emails');
    if (!exists) {
        await knex.schema.createTable('emails', (table) => {
            table.increments('id').primary();
            table.string('to');
            table.string('cc');
            table.string('bcc');
            table.string('subject');
            table.text('body');
            table.timestamps(true, true);
        });
        console.log('Created table: emails');
    } else {
        console.log('Table already exists: emails');
    }
    await knex.destroy();
}

export default createTable;
