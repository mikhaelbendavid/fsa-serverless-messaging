import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {

  // event.pathParameters.id references the threadId passed in
  // as a parameter through event object.

  const params = {
    TableName: "DynamoDBMessages",
    KeyConditionExpression: "ThreadId = :ThreadId",
    ExpressionAttributeValues: {
        ":ThreadId": event.pathParameters.id
    },

  };

  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result.Items));
  } catch(e) {
    console.log(e);
    callback(null, failure(e));
  }
}
