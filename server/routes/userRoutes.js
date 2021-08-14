const router = require('express').Router();
const AWS = require('aws-sdk');

const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = 'Thoughts';

router.get('/users', (req, res) => {
  const params = { TableName: table };

  // Scan return all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data.Items);
  });
});

router.get('/users/:username', (req, res) => {
  const params = {
    TableName: table,
    KeyConditionExpression: '#un = :user',
    ExpressionAttributeNames: {
      '#un': 'username',
      '#ca': 'createdAt',
      '#th': 'thought',
    },
    ExpressionAttributeValues: {
      ':user': req.params.username,
    },
    ProjectionExpression: '#th, #ca, #un',
    ScanIndexForward: false,
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error('unable to query. Error: ', JSON.stringify(err, null, 2));
      return res.status(500).json(err);
    }

    console.log('Query succeeded.');
    res.json(data.Items);
  });
});

router.post('/users', (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
    },
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to add item. Error: ',
        JSON.stringify(err, null, 2)
      );
      return res.status(500).json(err);
    }

    console.log('Added item: ', JSON.stringify(data, null, 2));
    res.json({ Added: JSON.stringify(data, null, 2) });
  });
});

module.exports = router;
