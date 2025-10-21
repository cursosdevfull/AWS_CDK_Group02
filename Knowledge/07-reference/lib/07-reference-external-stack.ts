import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

interface ReferenceExternalStackProps extends cdk.StackProps {
    table: TableV2
}

export class ReferenceExternalStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ReferenceExternalStackProps) {
        super(scope, id, props);

        const bucket = s3.Bucket.fromBucketArn(this, 'bucket-curso-angular-21', 'arn:aws:s3:::bucket-curso-angular-21');

        const lambdaFunction = new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.NODEJS_22_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, "./functions")),
            environment: {
                BUCKET_NAME: bucket.bucketName,
                TABLE_NAME: props.table.tableName
            }
        });

        bucket.grantRead(lambdaFunction);
        props.table.grantReadWriteData(lambdaFunction);
    }
}
