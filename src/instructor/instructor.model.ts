import { model, Schema } from 'mongoose';
import { IInstructor } from './instructor.interface';

const instructorSchema = new Schema<IInstructor>({});

const InstructorModel = model<IInstructor>('Instructor', instructorSchema);

export default InstructorModel;
