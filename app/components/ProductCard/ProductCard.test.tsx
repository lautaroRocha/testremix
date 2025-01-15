import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { RenderResult, render } from '@testing-library/react';

describe('< ProductCard />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<ProductCard/>)
        expect(component.container).toBeInTheDocument()
    })
})
