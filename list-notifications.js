import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {

  const params = {
    TableName: "DynamoDBNotifications",
    KeyConditionExpression: "RecipientId = :RecipientId",
    ExpressionAttributeValues: {
      ":RecipientId": event.pathParameters.id
    },
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result.Items));
  } catch(e) {
    callback(null, failure(e));
  }
}
