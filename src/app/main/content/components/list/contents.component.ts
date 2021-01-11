import { MatSort } from '@angular/material/sort';
import { getContents } from '../../store/actions/content.action';
import { Select, Store } from '@ngxs/store';
import { Content } from '../../models/content';
import { Observable } from 'rxjs';
import { ContentState } from '../../store/states/content.state';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'e-commerce-order',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ContentsComponent implements OnInit {
    @Select(ContentState.getContentList) contents: Observable<Content[]>;
    @Select(ContentState.getTotalContent) totalContents: Observable<number>;
    @ViewChild(MatSort) sort: MatSort;
    public displayedColumns = ['id', 'name', 'type', 'title', 'status'];
    public defaultPageSize = 5;
    public pageNo = 1;

    constructor(private store: Store) {
    }

    ngOnInit() {
       this.fetchContentList();
    }

    public getData($event) {
        this.defaultPageSize = $event.pageSize;
        this.pageNo = $event.pageIndex + 1;
        this.fetchContentList();
    }

    private fetchContentList() {
        this.store.dispatch(new getContents(`?pageSize=${this.defaultPageSize}&page=${this.pageNo}`));
    }

}