import '@testing-library/jest-dom';
import OrderDetail from './OrderDetail';
import { RenderResult, render } from '@testing-library/react';

describe('< OrderDetail />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<OrderDetail/>)
        expect(component.container).toBeInTheDocument()
    })
})
