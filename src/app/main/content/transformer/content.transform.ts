import { CONTENT } from './../models/content';
export function transformData(rows: []) {
    let contentArr: CONTENT[] = [];

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