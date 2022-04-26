import { User } from './models/User';

const user = new User({ name: 'My name', age: 30 });

console.log(user.get('name'));

user.set({ name: 'Pedrinho', age: 26 });

console.log(user.get('name'));
