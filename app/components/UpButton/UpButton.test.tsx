import '@testing-library/jest-dom';
import UpButton from './UpButton';
import { RenderResult, render } from '@testing-library/react';

describe('< UpButton />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<UpButton/>)
        expect(component.container).toBeInTheDocument()
    })
})
