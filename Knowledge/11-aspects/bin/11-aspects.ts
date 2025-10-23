#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AspectsStack } from '../lib/11-aspects-stack';

const app = new cdk.App();
new AspectsStack(app, 'AspectsStack', {
});