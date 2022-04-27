import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

type UserProps = { id?: number; name?: string; age?: number };

const rootUrl = 'http://localhost:3000/users';

export class User /*extends Attributes<UserProps>*/ {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get get() {
    return this.attributes.get;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse<UserProps>): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((): void => {
        this.trigger('save');
      })
      .catch((): void => {
        this.trigger('error');
      });
  }
}
