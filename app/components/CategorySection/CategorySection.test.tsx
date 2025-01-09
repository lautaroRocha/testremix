import '@testing-library/jest-dom';
import CategorySection from './CategorySection';
import { RenderResult, render } from '@testing-library/react';

describe('< CategorySection />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<CategorySection/>)
        expect(component.container).toBeInTheDocument()
    })
})
