import { Injectable } from '@angular/core';
import { ContentService } from './../../services/content.service';
import { getContents } from '../../store/actions/content.action';
import { Content } from './../../models/content';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { transformData } from '../../transformer/content.transform';

export class ContentStateModel {
    contents: Content[];
    totalContents: number;
}

@State<ContentStateModel>({
    name: 'contents',
    defaults: {
        contents: [],
        totalContents: 0
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

    @Selector()
    static getTotalContent(state: ContentStateModel) {
        return state.totalContents;
    }


    @Action(getContents)
    getContents({ getState, setState }: StateContext<ContentStateModel>, payload) {
        return this.contentService.getContents(payload.params).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                contents: transformData(result.rows),
                totalContents: result.total    
            });
        }));
    }
}