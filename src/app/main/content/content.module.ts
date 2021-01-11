import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { ContentComponent } from './detail/content.component';
import { ListViewModule } from '@bit/waqar_ali.philip-collection.list-view';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContentState } from './states/content.state';
import { Interceptor } from './content.interceptor';
import { ContentsComponent } from './list/contents.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { AgmCoreModule } from '@agm/core';


const routes = [
    {
        path: 'contents',
        component: ContentsComponent
    },
    {
        path: 'contents/:id',
        component: ContentComponent
    },
];

@NgModule({
    declarations: [
        ContentsComponent,
        ContentComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        ListViewModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatSortModule,
        MatSnackBarModule,
        MatTabsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,

        NgxsModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),

        HttpClientModule,
        NgxsModule.forRoot([
            ContentState
        ])
    ],
    exports: [
        ContentComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ]
})

export class ContentModule {
}
