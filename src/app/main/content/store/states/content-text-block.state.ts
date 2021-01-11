import { ContentTextBlock } from '../../models/content-text-blocks';
import { Injectable } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { getContent } from '../../store/actions/content.action';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { transformContentData } from '../../transformer/content.transform';

export class ContentTextBlockStateModel {
    contentTextBlocks: ContentTextBlock[];
    totalContentTextBlocks: number;
}

@State<ContentTextBlockStateModel>({
    name: 'contentTextBlocks',
    defaults: {
        contentTextBlocks: [],
        totalContentTextBlocks: 0
    }
})
@Injectable()
export class ContentTextBlockState {

    constructor(private contentService: ContentService) {
    }

    @Selector()
    static getContentTextBlockList(state: ContentTextBlockStateModel) {
        return state.contentTextBlocks;
    }

    @Selector()
    static getTotalContentTextBlock(state: ContentTextBlockStateModel) {
        return state.totalContentTextBlocks;
    }

    @Action(getContent)
    getContent({ getState, setState }: StateContext<ContentTextBlockStateModel>, payload) {
        console.log("call");
        return this.contentService.getContent(payload.id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                contentTextBlocks: transformContentData(result.rows),
                totalContentTextBlocks: result.total
            });
        }));

    }
}