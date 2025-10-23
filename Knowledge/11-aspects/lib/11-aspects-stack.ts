import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { BucketVersionAspect } from './aspects/bucket-version.aspect';
import { DynamoDBAspect } from './aspects/dynamodb.aspect';

export class AspectsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, "test-bucket-01", {
      versioned: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    new s3.Bucket(this, "test-bucket-02", {
      //versioned: false,
      versioned: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    new s3.Bucket(this, "test-bucket-03", {
      versioned: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    new dynamodb.TableV2(this, "test-table-01", {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    new dynamodb.TableV2(this, "test-table-02", {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    cdk.Aspects.of(this).add(new BucketVersionAspect())
    cdk.Aspects.of(this).add(new DynamoDBAspect())
  }
}
