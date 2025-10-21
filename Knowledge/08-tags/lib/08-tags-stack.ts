import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class TagsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new dynamodb.TableV2(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const myFunction = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '/functions')),
    })

    cdk.Tags.of(this).add('Project', 'KnowledgeBase');
    cdk.Tags.of(this).add('Owner', 'YourName');
    cdk.Tags.of(this).add("Team", "DevOps", { priority: 300 });
    cdk.Tags.of(this).add("CostCenter", "12345");

    cdk.Tags.of(myFunction).add("Environment", "Development");
    cdk.Tags.of(myFunction).add("Team", "Infrastructure");
  }
}
