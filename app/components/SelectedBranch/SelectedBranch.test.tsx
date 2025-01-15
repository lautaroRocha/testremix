import '@testing-library/jest-dom';
import SelectedBranch from './SelectedBranch';
import { RenderResult, render } from '@testing-library/react';

describe('< SelectedBranch />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<SelectedBranch/>)
        expect(component.container).toBeInTheDocument()
    })
})
