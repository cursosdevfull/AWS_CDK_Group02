import { Construct, Node } from "constructs";
import { NodeJsLambda } from "../packages/node-js-lambda";
import * as cdk from 'aws-cdk-lib';
import * as path from "path";

export class Functions extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const lambda01 = new NodeJsLambda(this, "Lambda01", {
            description: "Lambda que sera invocada por otra Lambda",
            entry: path.join(__dirname, "../lambdas/lambda01.ts")
        });

        const lambda02 = new NodeJsLambda(this, "Lambda02", {
            description: "Lambda que sera invocada por otra Lambda",
            entry: path.join(__dirname, "../lambdas/lambda02.ts")
        });

        const lambda03 = new NodeJsLambda(this, "Lambda03", {
            description: "Lambda que sera invocada por otra Lambda",
            entry: path.join(__dirname, "../lambdas/lambda03.ts")
        });

        const lambdaInvokeLambda = new NodeJsLambda(this, "LambdaInvokeLambda", {
            description: "Lambda que invoca a otra Lambda",
            entry: path.join(__dirname, "../lambdas/lambda-invoke-lambda.ts"),
            environment: {
                LAMBDA_01_NAME: lambda01.functionName,
                LAMBDA_02_NAME: lambda02.functionName,
                LAMBDA_03_NAME: lambda03.functionName,
            }
        });

        lambda01.grantInvoke(lambdaInvokeLambda);
        lambda02.grantInvoke(lambdaInvokeLambda);
        lambda03.grantInvoke(lambdaInvokeLambda);
    }
}