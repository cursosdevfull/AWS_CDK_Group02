import { Queue, QueueProps } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';

interface SqsProps extends Omit<QueueProps, "queueName"> {
    queueName?: string;
}

export class Sqs extends Construct {
    queue: Queue;

    constructor(scope: Construct, id: string, props?: SqsProps) {
        super(scope, id);

        this.queue = new Queue(this, id, {
            queueName: props?.queueName || `${id}-queue`,
            visibilityTimeout: cdk.Duration.minutes(3),
            ...props
        })
    }
}