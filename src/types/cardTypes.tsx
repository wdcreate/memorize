export interface ICardBase {
  word: string;
  translate: string;
  note: string;
  category: string;
  id: string;
}
export interface ICardMain extends ICardBase{
  date: Date;
  author: string;
}
export interface ICardNew {
  id: string;
  newWord: string;
  newTranslate: string;
  newNote: string;
  newCategory: string;
}
