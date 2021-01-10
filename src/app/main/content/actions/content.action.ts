import { CONTENT } from '../models/content';

export class addContent {
    static readonly type = '[CONTENT] Add';

    constructor(public payload: CONTENT) {
    }
}

export class getContents {
    static readonly type = '[CONTENTS] Get';
}

export class updateContent {
    static readonly type = '[CONTENT] Update';

    constructor(public payload: CONTENT, public id: string) {
    }
}

export class getContent {
    static readonly type = '[CONTENT] Get';

    constructor(public id: string) {
    }
}