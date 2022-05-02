import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';

export type UserProps = { id?: number; name?: string; age?: number };

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes(attrs),
      new Eventing(),
      new ApiSync(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, User.buildUser);
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
    this.trigger('change');
  }
}
