import '@testing-library/jest-dom';
import Chips from './Chips';
import { RenderResult, render } from '@testing-library/react';

describe('< Chips />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<Chips/>)
        expect(component.container).toBeInTheDocument()
    })
})
