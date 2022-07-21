import {createContext} from 'react';
import {UserType} from './Types'

type FriendContextType = {
    list: Array<UserType>
    selectedIndex: number,
    selectFriend: (user: any) => void,
    push: (friends: Array<UserType>, isReset: boolean) => void,
    splice: (friend: UserType) => void,

};

const FriendContextDefaultValues: FriendContextType = {
    list: [],
    selectedIndex: -1,
    selectFriend: (user: any) => {},
    push: (friends: Array<UserType>, isReset: boolean) => {},
    splice: (friend: UserType) => {}
}
const FriendContext = createContext<FriendContextType>(FriendContextDefaultValues);
export default FriendContext;