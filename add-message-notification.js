import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "DynamoNotificationsTable",

    Item: {
      RecipientId: data.recipientId,
      SenderId: data.senderId,
      NotificationId: uuid.v4(),
      NotificationMessage: data.notificationMessage,
      CreatedAt: Date.now(),
      Thread: data.threadId,
      Unread: true
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
