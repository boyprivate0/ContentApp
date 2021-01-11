import { ContentTextBlockState } from './../../store/states/content-text-block.state';
import { getContent } from '../../store/actions/content.action';
import { ContentTextBlock } from './../../models/content-text-blocks';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit{
    @Select(ContentTextBlockState.getContentTextBlockList) contentTextBlocks: Observable<ContentTextBlock[]>;
    @Select(ContentTextBlockState.getTotalContentTextBlock) total: Observable<number>;
    private contentID: string;
    constructor(private store: Store, private actRoute: ActivatedRoute) {
        this.contentID = this.actRoute.snapshot.params.id;
    }

    ngOnInit() {
        this.store.dispatch(new getContent(this.contentID));
    }

    public editItem(id: string) {
        console.log("selected content", id);
    }

}
