const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-2',
  // endpoint: 'http://localhost:8000',
});

/* Use the DocumentClient() class to create the dynamodb service 
  object. This class offers a level of abstraction that enables us to use 
  JavaScript objects as arguments and return native JavaScript types. */
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

console.log('Importing thoughts into DynamoDB. Please wait.');
const allUsers = JSON.parse(
  fs.readFileSync('./server/seed/users.json', 'utf8')
);

allUsers.forEach((user) => {
  // Set database entry
  const params = {
    TableName: 'Thoughts',
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      thought: user.thought,
    },
  };

  // Add though to database
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to add thought',
        user.username,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('PutItem succeeded:', user.username);
    }
  });
});
