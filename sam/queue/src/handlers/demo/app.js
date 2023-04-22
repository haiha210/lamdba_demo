const aws = require('aws-sdk');
aws.config.update({ region: 'ap-southeast-1' })
const sqs = new aws.SQS({ apiVersion: '2012-11-05' });
const QueueUrl = process.env.Endpoint;
const uuid = require('uuid').v4;

exports.handler = async (event) => {
    const params = {
        // Remove DelaySeconds parameter and value for FIFO queues
        // DelaySeconds: 10,
        MessageAttributes: {
            "Title": {
                DataType: "String",
                StringValue: "The Whistler"
            },
            "Author": {
                DataType: "String",
                StringValue: "John Grisham"
            },
            "WeeksOn": {
                DataType: "Number",
                StringValue: "6"
            }
        },
        MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
        MessageDeduplicationId: uuid(),  // Required for FIFO queues
        MessageGroupId: "email",  // Required for FIFO queues
        QueueUrl: QueueUrl
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });

    return {
        body: "demo",
        statusCode: 200
    };
};
