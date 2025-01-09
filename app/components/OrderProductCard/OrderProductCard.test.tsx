import '@testing-library/jest-dom';
import OrderProductCard from './OrderProductCard';
import { RenderResult, render } from '@testing-library/react';

describe('< OrderProductCard />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<OrderProductCard/>)
        expect(component.container).toBeInTheDocument()
    })
})
