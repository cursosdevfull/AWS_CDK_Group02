#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BucketStack } from '../lib/01-bucket-stack';

const app = new cdk.App();
new BucketStack(app, 'BucketStack', {
  environment: process.env.environment
});