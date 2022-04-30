import { User } from './models/User';
import { UserForm } from './views/UserForm';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const userForm = new UserForm(root, User.buildUser({ name: 'NAME', age: 20 }));
userForm.render();
