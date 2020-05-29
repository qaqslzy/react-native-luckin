import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Cart extends BaseModel {
    constructor(obj) {
        super(obj)
    }

    static get database() {
        return async () => SQLite.openDatabase('starbugs.db')
    }

    static get tableName() {
        return 'cart'
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
            productsId: { type: types.INTEGER, not_null: true, unique: true },
            num: { type: types.INTEGER, not_null: true }
        }
    }
}