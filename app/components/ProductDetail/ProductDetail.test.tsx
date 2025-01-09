import '@testing-library/jest-dom';
import ProductDetail from './ProductDetail';
import { RenderResult, render } from '@testing-library/react';

describe('< ProductDetail />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<ProductDetail/>)
        expect(component.container).toBeInTheDocument()
    })
})
