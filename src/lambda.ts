import awsLambdaFastify from '@fastify/aws-lambda';
import { Context, S3Event } from 'aws-lambda';
import app from './app';

const proxy = awsLambdaFastify(app);

exports.handler = async (event: any, context: Context) => proxy(event, context);
