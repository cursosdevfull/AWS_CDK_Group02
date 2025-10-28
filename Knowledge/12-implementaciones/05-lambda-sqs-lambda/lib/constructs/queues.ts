import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Sqs } from "../packages/sqs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

interface QueuesProps {
    lambdaSource: NodejsFunction;
    lambdaDestination: NodejsFunction;
}

export class Queues extends Construct {
    constructor(scope: Construct, id: string, props: QueuesProps) {
        super(scope, id);

        const { queue } = new Sqs(this, "queue")

        const event = new SqsEventSource(queue, {
            batchSize: 5,
        })

        props.lambdaSource.addEnvironment("QUEUE_URL", queue.queueUrl);
        props.lambdaDestination.addEventSource(event);

        queue.grantSendMessages(props.lambdaSource);
        queue.grantConsumeMessages(props.lambdaDestination);
    }

}