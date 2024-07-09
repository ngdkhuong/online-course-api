import client from '../config/redis';
import { promisify } from 'util';

const REDIS_GET = promisify(client.get).bind(client);
const REDIS_SET = promisify(client.set).bind(client);
const REDIS_LRANGE = promisify(client.lrange).bind(client);
