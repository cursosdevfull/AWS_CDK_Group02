import { Annotations, IAspect, Tokenization } from "aws-cdk-lib";
import { IConstruct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";

export class BucketVersionAspect implements IAspect {
    visit(node: IConstruct): void {
        if (node instanceof s3.CfnBucket) {
            if (!node.versioningConfiguration || (!Tokenization.isResolvable(node.versioningConfiguration) && node.versioningConfiguration.status !== "Enabled")) {
                Annotations.of(node).addError("Bucket versioning is not enabled")
            }
        }
    }

}