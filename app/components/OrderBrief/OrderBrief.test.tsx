import '@testing-library/jest-dom';
import OrderBrief from './OrderBrief';
import { RenderResult, render } from '@testing-library/react';

describe('< OrderBrief />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<OrderBrief/>)
        expect(component.container).toBeInTheDocument()
    })
})
