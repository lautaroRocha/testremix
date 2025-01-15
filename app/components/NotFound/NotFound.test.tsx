import '@testing-library/jest-dom';
import NotFound from './NotFound';
import { RenderResult, render } from '@testing-library/react';

describe('< NotFound />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<NotFound/>)
        expect(component.container).toBeInTheDocument()
    })
})
