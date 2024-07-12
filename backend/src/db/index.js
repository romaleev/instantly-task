import _knex from 'knex';

const knex = _knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './db.sqlite',
  },
});

class DB {
  static async addEmail(data) {
    return knex('emails').insert(data);
  }

  static async searchEmails(query) {
    return knex('emails')
        .where('to', 'like', `%${query}%`)
        .orWhere('cc', 'like', `%${query}%`)
        .orWhere('bcc', 'like', `%${query}%`)
        .orWhere('subject', 'like', `%${query}%`)
        .orWhere('body', 'like', `%${query}%`);
  }

  static async getEmails() {
    return knex('emails').select('*');
  }
}

export default DB;
