#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MicroserviceA } from '../lib/connect-direct/microservice-a';
import { MicroserviceB } from '../lib/connect-direct/microservice-b';
import { MicroserviceGrouping } from '../lib/grouping/microservice-grouping';
import { MicroserviceNested } from '../lib/nested/microservice-nested';

const app = new cdk.App();
new MicroserviceA(app, 'MicroserviceAStack', {
  description: 'Stack for Microservice A',
})
new MicroserviceB(app, 'MicroserviceBStack', {
  description: 'Stack for Microservice B',
})

new MicroserviceGrouping(app, 'MicroserviceGroupingConstruct');

new MicroserviceNested(app, 'MicroserviceNestedStack', {
  description: 'Nested Stack for Microservice',
});