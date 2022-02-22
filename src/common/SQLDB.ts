import {
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';
import {ToDoItem} from '../models';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'test.db', location: 'default'});
};

export const createTable = async () => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;
  const db = await getDBConnection();
  await db.executeSql(query);
};

export const getTodoItems = async (): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = [];
    const db = await getDBConnection();
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveTodoItems = async (
  todoItems: ToDoItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');
  const db = await getDBConnection();
  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  const db = await getDBConnection();
  await db.executeSql(deleteQuery);
};

export const deleteTable = async () => {
  const query = `drop table ${tableName}`;
  const db = await getDBConnection();
  await db.executeSql(query);
};
