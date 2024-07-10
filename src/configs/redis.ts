const { createClient } = require('redis');
const client = createClient({
    password: 'Kj2LfXMUtIFhVRD6ZIqATqD7O4VkUUAt',
    socket: {
        host: 'redis-16356.c8.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 16356,
    },
});
client.ping(function (err: any, result: any) {
    console.log(result);
});

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (error: any) => {
    console.error(error);
});

export default client;
