import { ContentTextBlock } from './../../models/content-text-blocks';

export class getContents {
    static readonly type = '[CONTENTS] Get';

    constructor(public params: string) {
    }
}

export class updateContent {
    static readonly type = '[CONTENT] Update';

    constructor(public payload: ContentTextBlock, public contentID: string, public blockID: string, public selectedIndex: number) {
    }
}

export class addContent {
    static readonly type = '[CONTENT] Add';

    constructor(public payload: ContentTextBlock, public contentID: string) {
    }
}

export class getContent {
    static readonly type = '[CONTENT] Get';

    constructor(public id: string, public params: string, public initialRequest = false) {
    }
}

export class getContentImages {
    static readonly type = '[CONTENT-IMAGES] Get';

    constructor(public id: string, public textID: string) {
    }
}

export class deleteContentImage {
    static readonly type = '[CONTENT] Delete Image';

    constructor(public payload: ContentTextBlock, public contentID: string, public blockID: string, public imageID: string) {
    }
}