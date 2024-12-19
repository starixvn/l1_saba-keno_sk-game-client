import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChipImage } from '../../../../src/components/bet-settings/chip-slider/chip-image';
import { buildVersion } from '../../../../src/common/constants';
import "@testing-library/jest-dom";

describe('ChipImage', () => {
    const defaultProps = {
        color: '#FF0000',
        className: 'test-class',
        width: '100px',
        height: '100px'
    };

    it('renders with correct props', () => {
        render(<ChipImage {...defaultProps} />);

        const imgElement = screen.getByAltText('Chip') as HTMLImageElement;

        expect(imgElement).toBeInTheDocument();
        expect(imgElement.className).toBe('test-class');
        expect(imgElement.width).toBe(0);
        expect(imgElement.height).toBe(0);
        expect(imgElement.src).toContain(`/static/images/chips/chip-ff0000.svg?v=${buildVersion}`);
    });

    it('handles empty color prop', () => {
        render(<ChipImage {...defaultProps} color="" />);

        const imgElement = screen.getByAltText('Chip') as HTMLImageElement;
        expect(imgElement.src).toContain(`/static/images/chips/chip-.svg?v=${buildVersion}`);
    });

    it('handles null color prop', () => {
        render(<ChipImage {...defaultProps} color={null as any} />);

        const imgElement = screen.getByAltText('Chip') as HTMLImageElement;
        expect(imgElement.src).toContain(`http://localhost/static/images/chips/chip-undefined.svg?v=${buildVersion}`);
    });

    it('handles error and sets default image', () => {
        render(<ChipImage {...defaultProps} />);

        const imgElement = screen.getByAltText('Chip') as HTMLImageElement;

        // Simulate image load error
        imgElement.dispatchEvent(new Event('error'));

        expect(imgElement.src).toContain('/static/images/chips/chip-default.svg');
        expect(imgElement.onerror).toBeNull();
    });

    it('renders without optional width and height props', () => {
        const { color, className } = defaultProps;
        render(<ChipImage color={color} className={className} />);

        const imgElement = screen.getByAltText('Chip') as HTMLImageElement;

        expect(imgElement).toBeInTheDocument();
        expect(imgElement.width).toBe(0);
        expect(imgElement.height).toBe(0);
    });
});
