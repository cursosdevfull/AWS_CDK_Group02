#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/03-lambda-stack';

const app = new cdk.App();
new LambdaStack(app, 'LambdaStack', {

});