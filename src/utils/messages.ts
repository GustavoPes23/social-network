import { v4 as uuid } from 'uuid';

import { mapUsersIds } from './users';

export interface Message {
    readonly id: string;
    readonly userId: string;
    readonly message: string;
    readonly likes: number;
    readonly date: string;
    readonly messageId?: string,
}

export const messages: Message[] = [
    {
        id: uuid(),
        userId: mapUsersIds.get("amyrobson")!,
        message: "Impressivel Thought it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        likes: 12,
        date: '1 month ago',
    },
    {
        id: uuid(),
        userId: mapUsersIds.get("maxblagun")!,
        message: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps, you can give me an insight on where I can learn React? Thanks!",
        likes: 5,
        date: '2 weeks ago',
    },

];

export const mapMessagesIds = new Map();
messages.forEach((message) => {
    mapMessagesIds.set(message.userId, message.id);
});

messages.push(
    {
        id: uuid(),
        userId: mapUsersIds.get("ramsesmiron")!,
        message: "@maxblagun If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        likes: 4,
        date: '1 week ago',
        messageId: mapMessagesIds.get(mapUsersIds.get("maxblagun")!)!,
    },
    {
        id: uuid(),
        userId: mapUsersIds.get("juliusomo")!,
        message: "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        likes: 2,
        date: '2 days ago',
        messageId: mapMessagesIds.get(mapUsersIds.get("maxblagun")!)!,
    },
);

messages.forEach((message) => {
    mapMessagesIds.set(message.userId, message.id);
});