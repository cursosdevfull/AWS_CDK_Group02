import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { RetentionDays } from "aws-cdk-lib/aws-logs";

interface NodeJsLambdaProps extends Omit<NodejsFunctionProps, "code"> {
    entry: string
}

export class NodeJsLambda extends NodejsFunction {
    constructor(scope: Construct, id: string, props: NodeJsLambdaProps) {
        super(scope, id, {
            runtime: cdk.aws_lambda.Runtime.NODEJS_22_X,
            bundling: {
                minify: true,
                sourceMap: true,
                externalModules: ["aws-sdk"],
                forceDockerBundling: false,
            },
            memorySize: 512,
            timeout: cdk.Duration.minutes(15),
            logRetention: RetentionDays.ONE_WEEK,
            ...props
        })
    }
}