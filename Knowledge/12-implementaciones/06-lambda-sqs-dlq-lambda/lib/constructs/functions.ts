import { Construct } from "constructs";
import * as path from "path";
import { NodeJsLambda } from "../packages/node-js-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from 'aws-cdk-lib';

export class Functions extends Construct {
    lambdaOrigin: NodejsFunction
    lambdaDestination: NodejsFunction
    lambdaDlq: NodejsFunction

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.lambdaOrigin = new NodeJsLambda(this, "LambdaSource", {
            description: "Lambda que envía mensajes a SQS",
            entry: path.join(__dirname, "../lambdas/lambda-origin.ts"),
            timeout: cdk.Duration.minutes(3),
        });

        this.lambdaDestination = new NodeJsLambda(this, "LambdaDestination", {
            description: "Lambda que procesa mensajes de SQS",
            entry: path.join(__dirname, "../lambdas/lambda-destination.ts"),
            timeout: cdk.Duration.minutes(3),
        });

        this.lambdaDlq = new NodeJsLambda(this, "LambdaDlq", {
            description: "Lambda que procesa mensajes de la DLQ",
            entry: path.join(__dirname, "../lambdas/lambda-dlq.ts"),
            timeout: cdk.Duration.minutes(3),
        });
    }
}