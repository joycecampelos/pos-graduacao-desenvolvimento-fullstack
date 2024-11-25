import { knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    books: {
      id: string;
      title: string;
      author: string;
      genrer: string;
      created_at: date;
      session_id?: string;
    };
  }
}
