import createKnex from 'knex';

export default function createQueryBuilder() {
    return createKnex({
        client: 'sqlite',
        connection: {
            filename: "file:sqlite.db",
        }
    });
};