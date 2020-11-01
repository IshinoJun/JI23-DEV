import Model from './Model';

interface Skill extends Model {
  name: string;
}

interface Hobby extends Model {
  name: string;
}

interface Qualification extends Model {
  name: string;
}

interface Profile extends Model {
  name: string;
  profession: string;
  introduction: string;
  year: number;
  skills: Array<Skill>;
  hobbies: Array<Hobby>;
  qualifications: Array<Qualification>;
}

export default Profile;
