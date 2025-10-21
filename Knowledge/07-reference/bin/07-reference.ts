#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ReferenceInternalStack } from '../lib/07-reference-internal-stack';
import { ReferenceExternalStack } from '../lib/07-reference-external-stack';
import { ResourcesStack } from '../lib/07-resources-stack';

const app = new cdk.App();

const { table } = new ResourcesStack(app, 'ResourcesStack', {});
new ReferenceInternalStack(app, 'ReferenceInternalStack', {});
new ReferenceExternalStack(app, 'ReferenceExternalStack', {
  table
})