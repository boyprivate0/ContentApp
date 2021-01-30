import { deleteContentImage } from './../actions/content.action';
import { image, ContentTextBlock } from './../../models/content-text-blocks';
import { UploadService } from './../../services/upload.service';
import { Injectable } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { getContent, getContentImages, updateContent, addContent } from '../../store/actions/content.action';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { transformContentData, transformContentImagesData } from '../../transformer/content.transform';


export class ContentTextBlockStateModel {
    contentTextBlocks: ContentTextBlock[];
    totalContentTextBlocks: number;
    updatedBlock: ContentTextBlock;
    addBlock: ContentTextBlock;
    contentImages: image[];
    error: string;
}

@State<ContentTextBlockStateModel>({
    name: 'contentTextBlocks',
    defaults: {
        contentTextBlocks: [],
        totalContentTextBlocks: 0,
        updatedBlock: null,
        contentImages: [],
        error: '',
        addBlock: null
    }
})
@Injectable()
export class ContentTextBlockState {

    constructor(private contentService: ContentService, private uploadService: UploadService) {
    }

    @Selector()
    static getContentTextBlockList(state: ContentTextBlockStateModel) {
        return state.contentTextBlocks;
    }

    @Selector()
    static getTotalContentTextBlock(state: ContentTextBlockStateModel) {
        return state.totalContentTextBlocks;
    }

    @Selector()
    static getContentImages(state: ContentTextBlockStateModel) {
        return state.contentImages;
    }

    @Selector()
    static updateContentBlock(state: ContentTextBlockStateModel) {
        return state.updatedBlock;
    }

    @Selector()
    static addContentBlock(state: ContentTextBlockStateModel) {
        return state.addBlock;
    }

    @Selector()
    static errorContentBlock(state: ContentTextBlockStateModel) {
        return state.error;
    }

    @Action(getContent)
    getContent({ getState, setState }: StateContext<ContentTextBlockStateModel>, payload) {
        return this.contentService.getContent(payload.id, payload.params).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                contentTextBlocks: payload.initialRequest ? transformContentData(result.rows) : [...state.contentTextBlocks, ...transformContentData(result.rows)],
                totalContentTextBlocks: result.total
            });
        }));
    }

    @Action(getContentImages)
    getContentImages({ getState, setState }: StateContext<ContentTextBlockStateModel>, payload) {
        return this.contentService.getContentImages(payload.id, payload.textID).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                contentImages: transformContentImagesData(result.rows),
            });
        }));
    }

    @Action(addContent)
    addContentBlock({ getState, setState }: StateContext<ContentTextBlockStateModel>, payload) {

        const state = getState();
        if (state.addBlock) {
            setState({
                ...state,
                addBlock: null
            });
        }

        const data = {
            code: payload.payload.title,
            content: {
                type: 'html',
                value: payload.payload.description
            }
        }

        return this.contentService.addContentBlock(data, payload.contentID).pipe(tap((result) => {
            const TextID = result.id;
            const total = state.contentTextBlocks.length;
            if (state.contentTextBlocks.length % 5 !== 0)
                state.contentTextBlocks.push({
                    id: TextID,
                    title: data.code,
                    type: data.content.type,
                    description: data.content.value
                });
            setState({
                ...state,
                contentTextBlocks: state.contentTextBlocks,
                addBlock: state.contentTextBlocks[total - 1]
            });

            payload.payload.images.map((file) => {
                this.uploadService.uploadFile(file).then(resultURL => {
                    const fileData = {
                        url: resultURL,
                        type: "image",
                        title: file.name
                    };
                    this.contentService.uploadContentBlockImage(fileData, payload.contentID, TextID).subscribe((result) => {
                        state.contentTextBlocks[total].image = resultURL;
                        setState({
                            ...state,
                            contentTextBlocks: state.contentTextBlocks,
                        });
                    });

                }, (error) => {
                    const state = getState();
                    setState({
                        ...state,
                        error: `Error in uploading image ${file.name}`,
                    });
                })
            })

        }));
    }

    @Action(updateContent)
    updateContentBlock({ getState, setState }: StateContext<ContentTextBlockStateModel>, payload) {

        const state = getState();
        if (state.updatedBlock) {
            setState({
                ...state,
                updatedBlock: null
            });
        }

        const data = {
            code: payload.payload.title,
            content: {
                type: 'html',
                value: payload.payload.description
            }
        }

        payload.payload.images.map((file) => {
            this.uploadService.uploadFile(file).then(resultURL => {
                const fileData = {
                    url: resultURL,
                    type: "image",
                    title: file.name
                };
                this.contentService.uploadContentBlockImage(fileData, payload.contentID, payload.blockID).subscribe((result) => {
                    state.contentTextBlocks[payload.selectedIndex].image =
                        state.contentTextBlocks[payload.selectedIndex].image ?
                            state.contentTextBlocks[payload.selectedIndex].image : resultURL;
                    setState({
                        ...state,
                        contentTextBlocks: state.contentTextBlocks,
                        updatedBlock: state.contentTextBlocks[payload.selectedIndex]
                    });
                });

            }, (error) => {
                const state = getState();
                setState({
                    ...state,
                    error: `Error in uploading image ${file.name}`,
                });
            })
        })

        return this.contentService.updateContentBlock(data, payload.contentID, payload.blockID).pipe(tap((result) => {
            state.contentTextBlocks[payload.selectedIndex].description = payload.payload.description;
            state.contentTextBlocks[payload.selectedIndex].title = payload.payload.title;
            setState({
                ...state,
                contentTextBlocks: state.contentTextBlocks,
                updatedBlock: state.contentTextBlocks[payload.selectedIndex]
            });
        }));
    }

    @Action(deleteContentImage)
    deleteContentImage({ getState, setState }: StateContext<ContentTextBlockStateModel>, payload) {
        return this.contentService.deleteContentImage(payload.contentID, payload.blockID, payload.imageID).pipe(tap((result) => {

        }));
    }
}