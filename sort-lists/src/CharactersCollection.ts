import { Sorter } from "./Sorter";

export class CharactersCollections extends Sorter {
  constructor(public data: string) {
    super();
  }

  // Awesome!
  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return (
      this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase()
    );
  }

  swap(leftIndex: number, rightIndex: number): void {
    const characters = this.data.split("");

    const leftItem = characters[leftIndex];
    characters[leftIndex] = characters[rightIndex];
    characters[rightIndex] = leftItem;

    this.data = characters.join("");
  }
}
