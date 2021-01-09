import { GetContents } from './actions/content.action';
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
        this.store.dispatch(new GetContents());
    }

    cardItems = [
        {
            id: 1,
            title: 'abc',
            description: 'description description description description description description asdasd asdad',
            image: 'https://cdn.shopify.com/s/files/1/0418/6429/8657/products/28_8dd73a51-38c2-4651-9279-3972bc856165_720x.jpg?v=1605700323'
        },
        {
            id: 2,
            title: 'abc2',
            description: 'description description description description description description asdasd asdad',
            image: 'https://cdn.shopify.com/s/files/1/0418/6429/8657/products/28_8dd73a51-38c2-4651-9279-3972bc856165_720x.jpg?v=1605700323'
        },
        {
            id: 3,
            title: 'abc3',
            description: 'description description description description description description asdasd asdad',
            image: 'https://cdn.shopify.com/s/files/1/0418/6429/8657/products/28_8dd73a51-38c2-4651-9279-3972bc856165_720x.jpg?v=1605700323'
        },
        {
            id: 4,
            title: 'abc4',
            description: 'description description description description description description asdasd asdad',
            image: 'https://cdn.shopify.com/s/files/1/0418/6429/8657/products/28_8dd73a51-38c2-4651-9279-3972bc856165_720x.jpg?v=1605700323'
        },
        {
            id: 5,
            title: 'abc5',
            description: 'description description description description description description asdasd asdad',
            image: 'https://cdn.shopify.com/s/files/1/0418/6429/8657/products/28_8dd73a51-38c2-4651-9279-3972bc856165_720x.jpg?v=1605700323'
        },
        {
            id: 6,
            title: 'abc6',
            description: 'description description description description description description asdasd asdad',
            image: 'https://cdn.shopify.com/s/files/1/0418/6429/8657/products/28_8dd73a51-38c2-4651-9279-3972bc856165_720x.jpg?v=1605700323'
        },
        {
            id: 7,
            title: 'abc7',
            description: 'description description description description description description asdasd asdad',
            image: 'https://cdn.shopify.com/s/files/1/0418/6429/8657/products/28_8dd73a51-38c2-4651-9279-3972bc856165_720x.jpg?v=1605700323'
        }
    ];

}
