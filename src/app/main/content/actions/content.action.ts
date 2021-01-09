import { CONTENT } from '../models/content';

export class AddContent {
    static readonly type = '[CONTENT] Add';

    constructor(public payload: CONTENT) {
    }
}

export class GetContents {
    static readonly type = '[CONTENT] Get';
}

export class UpdateContent {
    static readonly type = '[CONTENT] Update';

    constructor(public payload: CONTENT, public id: number) {
    }
}

export class DeleteContent {
    static readonly type = '[CONTENT] Delete';

    constructor(public id: number) {
    }
}

export class SetSelectedContent {
    static readonly type = '[CONTENT] Set';

    constructor(public payload: CONTENT) {
    }
}