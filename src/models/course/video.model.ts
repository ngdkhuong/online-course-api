// video.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IVideo extends Document {
    title: string;
    url: string;
    duration: number;
}

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
});

export const VideoModel = model<IVideo>('Video', videoSchema);
