import { User } from './models/User';

const user = new User({ name: 'My name', age: 30 });

user.on('change', () => {
  console.log('change');
});

user.trigger('change');
