import { NestedStack, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as path from "path";

class MicroserviceApiStack extends NestedStack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new apigateway.LambdaRestApi(this, "microservice-api-nested-stack", {
            handler: new lambda.Function(this, "microservice-api-nested-stack-function", {
                functionName: "microservice-api-nested-stack-function",
                runtime: lambda.Runtime.NODEJS_22_X,
                handler: "microservice-api-nested-stack.handler",
                code: lambda.Code.fromAsset(path.join(__dirname, "../functions")),
            }),
            proxy: true
        })
    }
}

class MicroserviceTableStack extends NestedStack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new dynamodb.TableV2(this, "microservice-table-stack-nested", {
            partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING }
        })
    }
}

export class MicroserviceNested extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new MicroserviceApiStack(this, "MicroserviceApiStack", {
            description: "Nested Stack for Microservice API",
        });

        new MicroserviceTableStack(this, "MicroserviceTableStack", {
            description: "Nested Stack for Microservice DynamoDB Table",
        });
    }

}