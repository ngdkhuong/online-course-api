// certificate.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ICertificate extends Document {
    title: string;
    description: string;
    image: string;
}

const certificateSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});

export const CertificateModel = model<ICertificate>('Certificate', certificateSchema);
