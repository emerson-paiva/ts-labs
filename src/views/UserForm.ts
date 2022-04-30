import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.btn-random-age': this.onSetRandomAgeClick,
      'click:.btn-change-name': this.onSetName,
    };
  }

  onSetRandomAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetName = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      this.model.set({ name: input.value });
    }
  };

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input id='name' />
        <button class='btn-change-name'>Change name</button>
        <button class='btn-random-age'>Set Random Age</button>
      </div>
    `;
  }
}
