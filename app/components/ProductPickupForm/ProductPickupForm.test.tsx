import '@testing-library/jest-dom';
import ProductPickupForm from './ProductPickupForm';
import { RenderResult, render } from '@testing-library/react';

describe('< ProductPickupForm />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<ProductPickupForm/>)
        expect(component.container).toBeInTheDocument()
    })
})
