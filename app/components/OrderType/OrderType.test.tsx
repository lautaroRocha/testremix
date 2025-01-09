import '@testing-library/jest-dom';
import OrderType from './OrderType';
import { RenderResult, render } from '@testing-library/react';

describe('< OrderType />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<OrderType/>)
        expect(component.container).toBeInTheDocument()
    })
})
