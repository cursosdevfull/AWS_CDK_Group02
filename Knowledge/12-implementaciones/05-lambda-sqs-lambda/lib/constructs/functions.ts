import { Construct } from "constructs";
import * as path from "path";
import { NodeJsLambda } from "../packages/node-js-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class Functions extends Construct {
    lambdaSource: NodejsFunction
    lambdaDestination: NodejsFunction

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.lambdaSource = new NodeJsLambda(this, "LambdaSource", {
            description: "Lambda que envía mensajes a SQS",
            entry: path.join(__dirname, "../lambdas/lambda-source.ts")
        });

        this.lambdaDestination = new NodeJsLambda(this, "LambdaDestination", {
            description: "Lambda que procesa mensajes de SQS",
            entry: path.join(__dirname, "../lambdas/lambda-destination.ts")
        });
    }
}