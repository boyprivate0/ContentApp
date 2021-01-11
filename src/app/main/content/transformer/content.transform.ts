import { Content } from './../models/content';
export function transformData(rows: []) {
    let contentArr: Content[] = [];

    contentArr = rows.map((row: any) => {
        return {
            id: row.id,
            name: row.data.name,
            type: row.data.type,
            status: row.data.status,
            title: row.data.title
        }
    })

    return contentArr;
}