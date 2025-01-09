import '@testing-library/jest-dom';
import BusinessSplash from './BusinessSplash';
import { RenderResult, render } from '@testing-library/react';

describe('< BusinessSplash />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<BusinessSplash/>)
        expect(component.container).toBeInTheDocument()
    })
})
