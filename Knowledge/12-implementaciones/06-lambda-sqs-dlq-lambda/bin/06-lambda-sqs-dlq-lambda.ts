#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaSqsDlqLambdaStack } from '../lib/06-lambda-sqs-dlq-lambda-stack';

const app = new cdk.App();
new LambdaSqsDlqLambdaStack(app, 'LambdaSqsDlqLambdaStack', {

});