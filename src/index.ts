import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';
import { UserList } from './views/UserList';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const users = new Collection('http://localhost:3000/users', (json: UserProps) =>
  User.buildUser(json)
);

users.on('change', () => {
  console.log(users.models);
  new UserList(root, users).render();
});

users.fetch();
