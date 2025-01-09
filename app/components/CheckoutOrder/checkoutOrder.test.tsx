import '@testing-library/jest-dom';
import CheckoutOrder from './CheckoutOrder';
import { RenderResult, render } from '@testing-library/react';

describe('< CheckoutOrder />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<CheckoutOrder/>)
        expect(component.container).toBeInTheDocument()
    })
})
