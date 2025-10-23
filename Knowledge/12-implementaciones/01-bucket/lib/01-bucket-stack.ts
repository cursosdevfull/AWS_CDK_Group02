import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface BucketStackProps extends cdk.StackProps {
  environment?: string;
}

export class BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BucketStackProps) {
    super(scope, id, props);

    const bucketName = `my-bucket-versioned-${cdk.Names.uniqueId(this).toLowerCase()}`

    new s3.Bucket(this, 'bucket', {
      bucketName,
      versioned: true,
      removalPolicy: props.environment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: !(props.environment === 'production')
    })

  }
}
