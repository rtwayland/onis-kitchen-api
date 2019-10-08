import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { attachment, name, category, notes, isFavorite, tags } = data;
  const params = {
    TableName: 'recipes',
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression:
      'SET #name_key = :name, category = :category, notes = :notes, isFavorite = :isFavorite, tags = :tags, attachment = :attachment',
    ExpressionAttributeNames: {
      '#name_key': 'name',
    },
    ExpressionAttributeValues: {
      ':attachment': attachment || null,
      ':name': name || null,
      ':category': category || null,
      ':notes': notes || null,
      ':isFavorite': typeof isFavorite === 'boolean' ? isFavorite : null,
      ':tags': tags || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
