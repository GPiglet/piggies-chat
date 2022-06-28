import {createContext} from 'react';

type SelectFriendContextType = {
    user: any,
    selectFriend: (user: any) => void;
};

const SelectFriendContextDefaultValues: SelectFriendContextType = {
    user: null,
    selectFriend: (user: any) => {},
}
export const SelectFriendContext = createContext<SelectFriendContextType>(SelectFriendContextDefaultValues);