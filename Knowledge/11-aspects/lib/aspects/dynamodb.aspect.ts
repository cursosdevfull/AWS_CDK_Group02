import { Annotations, IAspect } from "aws-cdk-lib";
import { IConstruct } from "constructs/lib/construct";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class DynamoDBAspect implements IAspect {
    visit(node: IConstruct): void {
        if (node instanceof dynamodb.CfnTable) {
            Annotations.of(node).addError("Only global tables are allowed");
        }
    }
}