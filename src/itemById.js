import createQueryBuilder from "./connection-factory";

export default async function itemById(source, {id}) {
    return await createQueryBuilder()
        .table('items')
        .where({id})
        .first();
}