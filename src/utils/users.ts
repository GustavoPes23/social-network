import AvatarAmy from "../assets/images/avatars/image-amyrobson.png";
import AvatarJulius from "../assets/images/avatars/image-juliusomo.png";
import AvatarMax from "../assets/images/avatars/image-maxblagun.png";
import AvatarRamses from "../assets/images/avatars/image-ramsesmiron.png";

import { v4 as uuid } from 'uuid';

export interface User {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
}

export const you = {
  id: uuid(),
  name: "juliusomo",
  avatar: AvatarJulius,
};

export const users: User[] = [
  {
    id: uuid(),
    name: "amyrobson",
    avatar: AvatarAmy,
  },
  {
    id: uuid(),
    name: "maxblagun",
    avatar: AvatarMax,
  },
  {
    id: uuid(),
    name: "ramsesmiron",
    avatar: AvatarRamses,
  },
  you
];

export const mapUsersIds = new Map();
users.forEach((user) => {
  mapUsersIds.set(user.name, user.id);
});