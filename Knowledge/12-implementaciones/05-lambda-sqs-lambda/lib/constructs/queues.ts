import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Sqs } from "../packages/sqs";

interface QueuesProps {
    lambdaSource: NodejsFunction;
    lambdaDestination: NodejsFunction;
}

export class Queues extends Construct {
    constructor(scope: Construct, id: string, props: QueuesProps) {
        super(scope, id);

        const { queue } = new Sqs(this, "queue")

        queue.grantSendMessages(props.lambdaSource);
        queue.grantConsumeMessages(props.lambdaDestination);
    }

}