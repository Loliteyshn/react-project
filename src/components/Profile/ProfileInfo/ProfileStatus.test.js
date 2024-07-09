import { render } from "@testing-library/react"
import { create } from "react-test-renderer"
import ProfileStatus from "./ProfileStatus"

describe('ProfileStatus component ', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='it-kamasutra' />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra");

    });
    test('after creation span with status should be displayed', () => {
        const component = create(<ProfileStatus status='it-kamasutra' />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();

    });
    test('after creation input shouldn`t be displayed', () => {
        const component = create(<ProfileStatus status='it-kamasutra' />);
        const root = component.root;
        expect(() => {
            const input = root.findByType("input");
        }).toThrow();

    });
    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status='it-kamasutra' />);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        expect(input.props.value).toBe('it-kamasutra');
    });
    // test('callback should be called', () => {
    //     const mockCallback = jest.fn();
    //     const component = create(<ProfileStatus status='it-kamasutra' updateStatus={mockCallback} />);
    //     const instance = component.getInstance();
    //     instance.deactivateEditMode();
    //     expect(mockCallback.mock.calls.length).toBe(1)
    // });
})