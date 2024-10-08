import { ResponseType } from "../api/api";
import { usersAPI } from "../api/usersApi";
import { UsersType } from "../components/types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users ids,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case 'SN/USERS/SET_USERS':
            {
                return {
                    ...state,
                    users: action.users,
                };
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            {
                return {
                    ...state,
                    currentPage: action.currentPage,
                };
            }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            {
                return {
                    ...state,
                    totalUsersCount: action.totalUsersCount,
                };
            }
        case 'SN/USERS/SET_FILTER':
            {
                return {
                    ...state,
                    filter: action.payload
                }
            }
        case 'SN/USERS/TOGLE_IS_FETCHING':
            {
                return {
                    ...state,
                    isFetching: action.isFetching,
                };
            }
        case 'SN/USERS/TOGLE_IS_FOLLOWING_PROGRESS':
            {
                return {
                    ...state,
                    followingInProgress: action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id != action.userId)
                };
            }
        default:
            return state;
    }
};

export const actions = {
    followSucces: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    unfollowSucces: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage, } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount, } as const),
    setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter, } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGLE_IS_FETCHING', isFetching, } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType)
    : ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number,
    apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data?.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number)
    : ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSucces);
    }
}

export const unfollow = (userId: number)
    : ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSucces);
    }
}


export default usersReducer;