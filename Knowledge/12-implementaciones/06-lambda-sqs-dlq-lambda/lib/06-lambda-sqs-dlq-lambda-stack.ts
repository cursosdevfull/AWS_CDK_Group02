import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Functions } from './constructs/functions';
import { Queues } from './constructs/queues';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaSqsDlqLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { lambdaOrigin, lambdaDestination, lambdaDlq } = new Functions(this, "functions");

    new Queues(this, "queues", {
      lambdaOrigin,
      lambdaDestination,
      lambdaDlq
    });
  }
}
