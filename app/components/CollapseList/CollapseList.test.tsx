import '@testing-library/jest-dom';
import CollapseList from './CollapseList';
import { RenderResult, render } from '@testing-library/react';

describe('< CollapseList />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<CollapseList/>)
        expect(component.container).toBeInTheDocument()
    })
})
