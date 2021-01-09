import { Injectable } from '@angular/core';
import { ContentService } from './../services/content.service';
import { GetContents } from './../actions/content.action';
import { CONTENT } from './../models/content';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

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


    @Action(GetContents)
    getContents({ getState, setState }: StateContext<ContentStateModel>) {
        console.log("hereeee");
        return this.contentService.getContents().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                contents: result,
            });
        }));
    }
}