import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {

  const data = JSON.parse(event.body);

  const params = {
    TableName: "DynamoDBNotifications",
    Key: {
      RecipientId: data.username,
      NotificationId: event.pathParameters.id,
    },
    UpdateExpression: 'SET Unread = :Unread',
    ExpressionAttributeValues: {
      ':Unread': false
    },
    ReturnValues: 'ALL_NEW',
  };
  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({status:true}));
  } catch(e) {
    console.log(e)
    callback(null, failure({ status: false }))
  }
}
