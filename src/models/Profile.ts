import { Model } from '.';

interface Skill extends Model {
  name: string;
}

interface Hobby extends Model {
  name: string;
}

interface Qualification extends Model {
  name: string;
}

export interface Profile extends Model {
  name: string;
  profession: string;
  introduction: string;
  year: number;
  skills: Skill[];
  hobbies: Hobby[];
  qualifications: Qualification[];
}
