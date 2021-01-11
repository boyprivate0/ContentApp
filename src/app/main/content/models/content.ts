export interface Content {
    id: string;
    name: string;
    type: string;
    status: "draft" | string;
    title?: string;
}