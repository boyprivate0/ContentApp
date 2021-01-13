import { updateContent } from './../../store/actions/content.action';
import { MODULE_CONFIG } from './../../constants/editor.const';
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
export class ContentComponent implements OnInit {
    @Select(ContentTextBlockState.getContentTextBlockList) contentTextBlocks: Observable<ContentTextBlock[]>;
    @Select(ContentTextBlockState.getTotalContentTextBlock) total: Observable<number>;
    public modules = MODULE_CONFIG;
    public selectedBlock: ContentTextBlock = null;
    public defaultPageSize = 4;
    public pageNo = 1;
    public totalCount = 0;
    private contentID: string;
    private contentBlocks: ContentTextBlock[];
    private selectedIndex: number;

    constructor(private store: Store, private actRoute: ActivatedRoute) {
        this.contentID = this.actRoute.snapshot.params.id;
        this.contentTextBlocks.subscribe((contentBlocks) => {
            this.contentBlocks = contentBlocks;
        })
        this.total.subscribe((total) => {
            this.totalCount = total;
        })
    }

    ngOnInit() {
        this.fetchContentBlockList();
    }

    public editItem(id: string) {
        this.selectedIndex = this.contentBlocks.findIndex(contentBlock => contentBlock.id === id);
        this.selectedBlock = this.contentBlocks[this.selectedIndex];
    }

    public contentUpdate($event) {

        if ($event !== undefined) {
            this.store.dispatch(new updateContent($event, this.selectedBlock.id, this.selectedIndex));
        }

        this.selectedBlock = null;
    }

    public loadMoreContentBlocks() {
        this.pageNo++;
        this.store.dispatch(new getContent(this.contentID, `?pageSize=${this.defaultPageSize}&page=${this.pageNo}`));
    }


    private fetchContentBlockList() {
        this.store.dispatch(new getContent(this.contentID, `?pageSize=${this.defaultPageSize}&page=${this.pageNo}`, true));
    }

}
