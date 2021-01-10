import { getContent, getContents } from './actions/content.action';
import { Select, Store } from '@ngxs/store';
import { CONTENT } from './models/content';
import { Observable } from 'rxjs';
import { ContentState } from './states/content.state';
import { Component } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    animations: fuseAnimations
})
export class ContentComponent {
    @Select(ContentState.getContentList) contents: Observable<CONTENT[]>;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(new getContents());
    }

    public editItem(id: string) {
        const contentData = this.store.dispatch(new getContent(id));
        console.log("selected content", contentData);
    }

}
