import {createContext} from 'react';
export type MessageType = {
    sender: string,
    receiver: string,
    message: string,
    createDate: Date
}
type MessageContextType = {
    list: Array<MessageType>,
    push: (msg: Array<MessageType>, isReset: boolean) => void
};

const MessageContextDefaultValues: MessageContextType = {
    list: [],
    push: (msg: Array<MessageType>, isReset: boolean) => {}
}
export const MessageContext = createContext<MessageContextType>(MessageContextDefaultValues);