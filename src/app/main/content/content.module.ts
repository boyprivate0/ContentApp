import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { ContentComponent } from './content.component';
import { ListViewModule } from '@bit/waqar_ali.philip-collection.list-view';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContentState } from './states/content.state';
import { Interceptor } from './content.interceptor';

const routes = [
    {
        path: 'content',
        component: ContentComponent
    }
];

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatButtonModule,
        MatChipsModule,
        ListViewModule,

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
