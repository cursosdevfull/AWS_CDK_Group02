import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as path from "path";

class MicroserviceApiStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new apigateway.LambdaRestApi(this, "microservice-api", {
            handler: new lambda.Function(this, "microservice-api-function", {
                functionName: "microservice-api-function",
                runtime: lambda.Runtime.NODEJS_22_X,
                handler: "microservice-api.handler",
                code: lambda.Code.fromAsset(path.join(__dirname, "../functions")),
            }),
            proxy: true
        })
    }
}

class MicroserviceTableStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new dynamodb.TableV2(this, "microservice-table", {
            partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING }
        })
    }
}

export class MicroserviceGrouping extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new MicroserviceApiStack(this, "MicroserviceApiStack", {
            description: "Stack for Microservice API",
        });

        new MicroserviceTableStack(this, "MicroserviceTableStack", {
            description: "Stack for Microservice DynamoDB Table",
        });
    }
}