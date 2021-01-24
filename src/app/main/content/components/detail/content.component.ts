import { getContentImages, updateContent } from './../../store/actions/content.action';
import { MODULE_CONFIG } from './../../constants/editor.const';
import { ContentTextBlockState } from './../../store/states/content-text-block.state';
import { getContent } from '../../store/actions/content.action';
import { ContentTextBlock } from './../../models/content-text-blocks';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
    @Select(ContentTextBlockState.updateContentBlock) updateContent: Observable<ContentTextBlock>;
    @Select(ContentTextBlockState.getContentImages) contentImages: Observable<string[]>;
    @Select(ContentTextBlockState.errorContentBlock) errorContentBlock: Observable<string>;

    public modules = MODULE_CONFIG;
    public selectedBlock: ContentTextBlock = null;
    public defaultPageSize = 4;
    public pageNo = 1;
    public totalCount = 0;
    private contentID: string;
    public images: string[];
    private contentBlocks: ContentTextBlock[];
    private selectedIndex: number;
    private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private store: Store, private actRoute: ActivatedRoute, private _snackBar: MatSnackBar) {
        this.contentID = this.actRoute.snapshot.params.id;
    }

    ngOnInit() {
        this.fetchContentBlockList();
        this.contentTextBlocks.subscribe((contentBlocks) => {
            this.contentBlocks = contentBlocks;
            if (this.contentBlocks.length === 0) return;
            this._snackBar.open('Text-blocks fetched successfully', 'x', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        })

        this.total.subscribe((total) => {
            this.totalCount = total;
        })

        this.updateContent.subscribe((block) => {
            if (!block) return;
            this._snackBar.open('Text-block updated successfully', 'x', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        })

        this.contentImages.subscribe((images) => {
            this.images = images;
            this.selectedBlock = this.contentBlocks[this.selectedIndex];
        })

        this.errorContentBlock.subscribe((errorMsg) => {
            if (!errorMsg) return;
            this._snackBar.open(errorMsg, 'x', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        })
    }

    public editItem(id: string) {
        this.store.dispatch(new getContentImages(this.contentID, id));
        this.selectedIndex = this.contentBlocks.findIndex(contentBlock => contentBlock.id === id);
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
