import { ContentTextBlock } from './../../models/content-text-blocks';

export class getContents {
    static readonly type = '[CONTENTS] Get';

    constructor(public params: string) {
    }
}

export class updateContent {
    static readonly type = '[CONTENT] Update';

    constructor(public payload: ContentTextBlock, public id: string, public selectedIndex: number) {
    }
}

export class getContent {
    static readonly type = '[CONTENT] Get';

    constructor(public id: string, public params: string, public initialRequest = false) {
    }
}