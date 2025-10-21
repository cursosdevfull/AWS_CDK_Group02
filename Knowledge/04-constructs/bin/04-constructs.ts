#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ConstructsStack } from '../lib/04-constructs-stack';

const app = new cdk.App();
new ConstructsStack(app, 'ConstructsStack', {
  description: "AWS CDK Constructs - Examples",
});