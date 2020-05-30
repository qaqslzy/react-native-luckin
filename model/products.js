import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
 
export default class Products extends BaseModel {
  constructor(obj) {
    super(obj)
  }
 
  static get database() {
    return async () => SQLite.openDatabase('starbugs.db')
  }
 
  static get tableName() {
    return 'products'
  }
 
  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      title: { type: types.TEXT, not_null: true },
      price: { type: types.FLOAT, not_null: true },
      english: { type: types.TEXT, not_null: true },
      sort: { type: types.TEXT, not_null: true },
      details:{type: types.TEXT, not_null: true},
    }
  }
}