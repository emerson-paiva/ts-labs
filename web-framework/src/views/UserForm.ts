import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.btn-random-age': this.onSetRandomAgeClick,
      'click:.btn-change-name': this.onSetName,
      'click:.btn-save': this.onSaveClick,
    };
  }

  onSaveClick = (): void => this.model.save();

  onSetRandomAgeClick = (): void => this.model.setRandomAge();

  onSetName = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      this.model.set({ name: input.value });
    }
  };

  template(): string {
    return `
      <div>
        <input id='name' placeholder="${this.model.get('name')}" />
        <button class='btn-change-name'>Change name</button>
        <button class='btn-random-age'>Set Random Age</button>
        <button class='btn-save'>Save</button>
      </div>
    `;
  }
}
