import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Rating, { IRatingModel } from '../models/Rating';
import CorporateTrainee from '../models/CorporateTrainee';
import IndividualTrainee from '../models/IndividualTrainee';
import Course, { ICourse, ICourseModel } from '../models/Course';


