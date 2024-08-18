import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Rating from '../models/Rating';
import Instructor from '../models/Instructor';
import { serializeRating } from './CourseRating';
import mongoose from 'mongoose';
import IndividualTrainee from '../models/IndividualTrainee';
import CorporateTrainee from '../models/CorporateTrainee';
