import { ICertificate } from '../interfaces/certificate.interface';
import { Schema, model } from 'mongoose';

const certificateSchema = new Schema<ICertificate>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
});

export const CertificateModel = model<ICertificate>('Certificate', certificateSchema);
