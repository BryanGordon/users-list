declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export type Info = {
  seed:    string;
  results: number;
  page:    number;
  version: string;
}

export type User = {
  gender:     Gender;
  name:       Name;
  location:   Location;
  email:      string;
  login:      Login;
  dob:        Dob;
  registered: Dob;
  phone:      string;
  cell:       string;
  id:         ID;
  picture:    Picture;
  nat:        string;
}

export type Dob = {
  date: Date;
  age:  number;
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export type ID = {
  name:  string;
  value: null | string;
}

export type Location = {
  street:      Street;
  city:        string;
  state:       string;
  country:     string;
  postcode:    number | string;
  coordinates: Coordinates;
  timezone:    Timezone;
}

export type Coordinates = {
  latitude:  string;
  longitude: string;
}

export type Street = {
  number: number;
  name:   string;
}

export type Timezone = {
  offset:      string;
  description: string;
}

export type Login = {
  uuid:     string;
  username: string;
  password: string;
  salt:     string;
  md5:      string;
  sha1:     string;
  sha256:   string;
}

export type Name = {
  title: Title;
  first: string;
  last:  string;
}

export enum Title {
  MS = "Ms",
  Madame = "Madame",
  Mademoiselle = "Mademoiselle",
  Miss = "Miss",
  Monsieur = "Monsieur",
  Mr = "Mr",
  Mrs = "Mrs",
}

export type Picture = {
  large:     string;
  medium:    string;
  thumbnail: string;
}

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  LAST = 'last',
  COUNTRY = 'country'

}

export type APIResults = {
  results: User[];
  info:    Info;
}
