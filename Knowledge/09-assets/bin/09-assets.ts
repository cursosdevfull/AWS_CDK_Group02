#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AssetsFileStack } from '../lib/assets-file-stack';
import { AssetsContainerStack } from '../lib/assets-container-stack';

const app = new cdk.App();
new AssetsFileStack(app, 'AssetsFileStack', {});
new AssetsContainerStack(app, 'AssetsContainerStack', {});