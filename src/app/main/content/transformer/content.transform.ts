import { ContentTextBlock } from './../models/content-text-blocks';
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

export function transformContentData(rows: []) {
    let contentTextBlockArr: ContentTextBlock[] = [];

    contentTextBlockArr = rows.map((row: any) => {
        return {
            id: row.id,
            title: row.data.code,
            type: row.data.content && row.data.content.type ? row.data.content.type : null,
            description: row.data.content && row.data.content.value ? row.data.content.value : null,
            image: row.data.media && row.data.media[0] && row.data.media[0].url ? row.data.media[0].url : null
        }
    })

    return contentTextBlockArr;
}

export function transformContentImagesData(rows: []) {
    let contentTextBlockImagesArr: string[] = [];

    contentTextBlockImagesArr = rows.map((row: any) => {
        return row.data.url;
    })

    return contentTextBlockImagesArr;
}