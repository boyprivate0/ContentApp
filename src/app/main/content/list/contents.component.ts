import { MatSort } from '@angular/material/sort';
import { getContents } from '../actions/content.action';
import { Select, Store } from '@ngxs/store';
import { Content } from '../models/content';
import { Observable } from 'rxjs';
import { ContentState } from '../states/content.state';
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
    @ViewChild(MatSort) sort: MatSort;
    public displayedColumns = ['id', 'name', 'type', 'title', 'status'];


    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(new getContents());
    }

}