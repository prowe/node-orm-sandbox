import createKnex from 'knex';
import {vi, expect, beforeEach, it, describe} from 'vitest';
import createQueryBuilder from "./connection-factory";
import itemById from "./itemById";

vi.mock('./connection-factory');

const bunchOfIds = new Array(1000).fill(undefined).map((_, i) => `${i}`);

// 242ms (30x faster)
beforeEach(() => {
    const mockKnex = vi.fn()
    mockKnex.table = vi.fn().mockReturnValue(mockKnex);
    mockKnex.where = vi.fn().mockReturnValue(mockKnex);
    mockKnex.first = vi.fn().mockReturnValue(mockKnex);
    createQueryBuilder.mockReturnValue(mockKnex);
});

it.each(bunchOfIds)('should return the %s item', async (id) => {
    createQueryBuilder().first.mockResolvedValue({
        id,
        name: 'Widget'
    });

    const result = await itemById({}, {id});

    expect(result).toEqual({
        id,
        name: 'Widget'
    })
});
