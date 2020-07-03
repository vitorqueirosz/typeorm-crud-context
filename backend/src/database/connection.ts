import { createConnection } from 'typeorm';


createConnection().then(() => console.log('Its connected!'));