#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaInvokeLambdaStack } from '../lib/04-lambda-invoke-lambda-stack';

const app = new cdk.App();
new LambdaInvokeLambdaStack(app, 'LambdaInvokeLambdaStack', {

});