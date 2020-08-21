import { Photo } from "./photo";

export interface User {
    // Adding types in typescript
    // Main language of angular.Superset of javascript which gives extra featurs to do things in efficient way.
    // When it compiles it gives pure javascript which all browser understand. 
    // Like (Static Type,Class,Interface,Intellicence,AutoComplete,Compile time check before building)
    // Giving a return type to a object or variable is called static type.
    // Optional variables will always come after required oncs.Else it will throw error.
    // This object is for both Dtos UserForList and UserForDetailed.
    id: number;
    username: string;
    gender: string;
    age: number;
    created: Date;
    knownAs: string;
    lastActive: Date;
    city: string;
    country: string;
    photoUrl: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    photos?: Photo[];

}
