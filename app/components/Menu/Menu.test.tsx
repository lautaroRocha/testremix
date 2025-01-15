import '@testing-library/jest-dom';
import Menu from './Menu';
import { RenderResult, render } from '@testing-library/react';

describe('< Menu />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<Menu/>)
        expect(component.container).toBeInTheDocument()
    })
})
