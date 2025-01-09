import '@testing-library/jest-dom';
import BranchSelector from './BranchSelector';
import { RenderResult, render } from '@testing-library/react';

describe('< BranchSelector />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<BranchSelector/>)
        expect(component.container).toBeInTheDocument()
    })
})
