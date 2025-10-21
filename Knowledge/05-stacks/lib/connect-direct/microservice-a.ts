import { Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";

export class MicroserviceA extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new lambda.Function(this, "microservice-a-function", {
            runtime: lambda.Runtime.NODEJS_22_X,
            functionName: "MicroserviceAFunction",
            handler: "microservice-a.handler",
            code: lambda.Code.fromAsset(path.join(__dirname, "../functions"))
        })
    }
}