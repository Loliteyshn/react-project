import { follow, unfollow } from "./users-reducer";
import { usersAPI } from "../api/usersApi";
import { ResponseType, ResultCodesEnum } from "../api/api";
import { actions } from "./users-reducer";

jest.mock("../api/usersApi");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
})

test("success follow thunk", async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSucces(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
});

test("success unfollow thunk", async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSucces(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})