import _knex from 'knex';

const knex = _knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './db.sqlite',
  },
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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
    await sleep(5000)
    return knex('emails').select('*');
  }
}

export default DB;
