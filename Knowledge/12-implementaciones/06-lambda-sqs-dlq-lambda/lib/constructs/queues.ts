import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Sqs } from "../packages/sqs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

interface QueuesProps {
    lambdaOrigin: NodejsFunction;
    lambdaDestination: NodejsFunction;
    lambdaDlq: NodejsFunction;
}

export class Queues extends Construct {
    constructor(scope: Construct, id: string, props: QueuesProps) {
        super(scope, id);

        const { queue: queueDlq } = new Sqs(this, "queue-dlq")
        const { queue } = new Sqs(this, "queue", {
            deadLetterQueue: {
                maxReceiveCount: 1,
                queue: queueDlq
            }
        });

        const event = new SqsEventSource(queue, {
            batchSize: 5,
            reportBatchItemFailures: true,
        })

        props.lambdaOrigin.addEnvironment("QUEUE_URL", queue.queueUrl);
        props.lambdaDestination.addEventSource(event);

        queue.grantSendMessages(props.lambdaOrigin);
        queue.grantConsumeMessages(props.lambdaDestination);

        props.lambdaDlq.addEventSource(new SqsEventSource(queueDlq, {
            batchSize: 5,
        }));

        queueDlq.grantConsumeMessages(props.lambdaDlq);
    }

}