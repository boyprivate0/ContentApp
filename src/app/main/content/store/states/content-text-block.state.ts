import { ContentTextBlock } from '../../models/content-text-blocks';
import { Injectable } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { getContent, updateContent } from '../../store/actions/content.action';
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
        return this.contentService.getContent(payload.id, payload.params).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                contentTextBlocks: payload.initialRequest ? transformContentData(result.rows) : [...state.contentTextBlocks, ...transformContentData(result.rows)],
                totalContentTextBlocks: result.total
            });
        }));
    }

    @Action(updateContent)
    setSelectedTodoId({ getState, setState }: StateContext<ContentTextBlockStateModel>, payload) {
        const data = {
            content: {
                type: payload.payload.title,
                value: payload.payload.description
            }
        }

        return this.contentService.updateContentBlock(data, payload.id).pipe(tap((result) => {
            const state = getState();
            state.contentTextBlocks[payload.selectedIndex].description = payload.payload.description;
            state.contentTextBlocks[payload.selectedIndex].title = payload.payload.title;
            setState({
                ...state,
                contentTextBlocks: state.contentTextBlocks
            });
        }));
    }
}