#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MicroserviceEnvironmentNested } from '../lib/environment-stack';

const app = new cdk.App();
new MicroserviceEnvironmentNested(app, 'EnvironmentStack', {
  env: { account: '282865065290', region: 'us-east-1' }
});