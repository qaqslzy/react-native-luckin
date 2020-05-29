import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
 
export default class Collection extends BaseModel {
  constructor(obj) {
    super(obj)
  }
 
  static get database() {
    return async () => SQLite.openDatabase('starbugs.db')
  }
 
  static get tableName() {
    return 'collection'
  }
 
  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      productsId: { type: types.INTEGER, not_null: true, unique: true }
    }
  }
}