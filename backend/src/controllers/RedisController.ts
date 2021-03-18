import {
  Request,
  Response,
  // NextFunction
} from 'express';
import redis from 'redis';
import { promisify } from 'util';

// typescript examples
// https://docs.microsoft.com/en-us/azure/azure-cache-for-redis/cache-nodejs-get-started

// Getting .env file
const accessKey = process.env.REDIS_ACCESS_KEY || '';
const hostname = process.env.REDIS_HOSTNAME || '';

// Connect to the Azure Cache for Redis over the TLS port using the key.
const client = redis.createClient(6380, hostname, {
  password: accessKey,
  tls: { servername: hostname },
});

// Convert Redis client API to use promises, to make it usable with async/await syntax
const pingAsync = promisify(client.ping).bind(client);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// GET /redis
export const getRedis = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    // Perform cache operations using the cache connection object...
    // Simple PING command
    const ping = await pingAsync();
    console.log('\nRedis command: PING');
    console.log('Redis response : ' + ping);

    // Get redis version
    const version = client.server_info.redis_version;
    console.log('\nRedis command: SERVER_INFO REDIS_VERSION');
    console.log('Redis response : ' + version);

    // Simple get the cache
    const bookString = await getAsync('book');
    const book = bookString && JSON.parse(bookString);
    console.log('\nCache command: GET book');
    console.log('Cache response : ' + bookString);

    res.status(200);
    res.json({
      success: true,
      ping,
      version,
      book,
    });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  }
};

// POST /redis
export const postRedis = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const { title, author, releaseYear } = req.body;

    // Perform cache operations using the cache connection object...
    // Simple set value to cache
    const bookOK = await setAsync(
      'book',
      JSON.stringify({
        title,
        author,
        releaseYear,
        createdAt: Date.now(),
      })
    );
    console.log('\nCache command: SET book');
    console.log('Cache response : ' + bookOK);

    res.status(201);
    res.json({ success: true, bookOK });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  }
};
