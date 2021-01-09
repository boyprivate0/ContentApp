import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'content',
                title: 'Content',
                translate: 'NAV.CONTENT.TITLE',
                type: 'item',
                icon: 'email',
                url: '/content',

            }
        ]
    }
];
