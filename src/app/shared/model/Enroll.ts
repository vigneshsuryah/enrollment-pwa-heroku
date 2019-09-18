import {Person} from "./Person";
import {Photo} from "./Photo";
import {DictionaryItem} from "./DictionaryItem";

export class Enroll {
  state: DictionaryItem;
  plans: DictionaryItem;
  person: Person;
  signature: string;
  photos: Photo[];
  numberOfPhotos: number;

  constructor() {
    this.person = <Person> {};
    this.photos = [];
  }
}
