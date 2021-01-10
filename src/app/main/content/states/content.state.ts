import { Injectable } from '@angular/core';
import { ContentService } from './../services/content.service';
import { getContents, getContent } from './../actions/content.action';
import { CONTENT } from './../models/content';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { transformData } from '../transformer/content.transform';

export class ContentStateModel {
    contents: CONTENT[];
}

@State<ContentStateModel>({
    name: 'contents',
    defaults: {
        contents: []
    }
})
@Injectable()
export class ContentState {

    constructor(private contentService: ContentService) {
    }

    @Selector()
    static getContentList(state: ContentStateModel) {
        return state.contents;
    }


    @Action(getContents)
    getContents({ getState, setState }: StateContext<ContentStateModel>) {
        return this.contentService.getContents().pipe(tap((result) => {

            const state = getState();
            setState({
                ...state,
                contents: transformData(result.rows),
            });
        }));
    }

    @Action(getContent)
    getContent({ getState, setState }: StateContext<ContentStateModel>, payload) {
        return this.contentService.getContent(payload.id).pipe(tap((result) => {
            return result
            // const state = getState();
            // setState({
            //     ...state,
            //     contents: transformData(result.rows),
            // });
        }));

    }
}