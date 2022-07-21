import {createContext} from 'react';
import {MessageType} from './Types';

type MessageContextType = {
    list: Array<MessageType>,
    push: (msg: Array<MessageType>, isReset: boolean) => void
};

const MessageContextDefaultValues: MessageContextType = {
    list: [],
    push: (msg: Array<MessageType>, isReset: boolean) => {}
}
const MessageContext = createContext<MessageContextType>(MessageContextDefaultValues);
export default MessageContext;