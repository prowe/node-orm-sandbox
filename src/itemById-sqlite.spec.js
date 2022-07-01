import createKnex from 'knex';
import {vi, expect, beforeEach, it, describe} from 'vitest';
import createQueryBuilder from "./connection-factory";
import itemById from "./itemById";

vi.mock('./connection-factory');

const bunchOfIds = new Array(1000).fill(undefined).map((_, i) => `${i}`);

// 6.85s
beforeEach(async () => {
    const inMemConn = createKnex({
        client: 'sqlite',
        useNullAsDefault: true,
        connection: {
            filename: ":memory:",
        }
    });
    await inMemConn.migrate.latest();
    createQueryBuilder.mockReturnValue(inMemConn);
});

it.each(bunchOfIds)('should return the %s item', async (id) => {
    await createQueryBuilder()
        .insert({
            id,
            name: 'Widget'
        })
        .into('items');

    const result = await itemById({}, {id});

    expect(result).toEqual({
        id,
        name: 'Widget'
    })
});