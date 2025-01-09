import '@testing-library/jest-dom';
import BranchBadge from './BranchBadge';
import { RenderResult, render } from '@testing-library/react';

describe('< BranchBadge />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<BranchBadge/>)
        expect(component.container).toBeInTheDocument()
    })
})
