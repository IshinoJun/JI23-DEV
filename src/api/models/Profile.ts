import Model from "./Model";

interface Skill {
  name: string;
}

interface Hobby {
  name: string;
}

interface Qualification {
  name: string;
}

interface Profile extends Model {
  id?: number;
  name: string;
  profession: string;
  introduction: string;
  year: number;
  skills: Skill[];
  hobbies: Hobby[];
  qualifications: Qualification[];
}

export default Profile;
