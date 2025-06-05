"use client";

import { useEffect, useState } from 'react';
import { FormHeader } from './FormHeader';
import { MultiSelect } from './MultiSelect';
import { CloseCircleIcon } from './Icons';

interface CustomerOptionsFormProps {
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const fullSizeMap = [
  'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'
];

const shortSizeMap = ['xxs', 'xs', 'sm', 'md', 'l', 'xl', 'xxl', 'xxxl'];

const mapToFull = (sizes: string[]) =>
  sizes.map((s) => {
    const index = shortSizeMap.indexOf(s);
    return index !== -1 ? fullSizeMap[index] : s;
  });

const mapToShort = (sizes: string[]) =>
  sizes.map((s) => {
    const index = fullSizeMap.indexOf(s);
    return index !== -1 ? shortSizeMap[index] : s;
  });

// From CSS color spec: 140+ named colors
const allColors = [
  'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black',
  'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse',
  'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue',
  'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta',
  'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen',
  'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue',
  'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro',
  'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink',
  'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen',
  'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray',
  'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray',
  'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon',
  'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen',
  'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue',
  'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab',
  'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed',
  'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple',
  'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell',
  'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue',
  'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke',
  'Yellow', 'YellowGreen'
];

const CustomerOptionsForm: React.FC<CustomerOptionsFormProps> = ({
  onPrevious,
  onNext,
  onCancel,
  onClose,
}) => {
  const [sizeStyle, setSizeStyle] = useState<'full' | 'short'>('full');
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const currentSizeOptions = sizeStyle === 'full' ? fullSizeMap : shortSizeMap;

  const handleToggleSizeStyle = () => {
    setSizeStyle((prevStyle) => {
      const newStyle = prevStyle === 'full' ? 'short' : 'full';
      const convertedSizes = newStyle === 'short' ? mapToShort(sizes) : mapToFull(sizes);
      setSizes(convertedSizes);
      return newStyle;
    });
  };

  const handleAddSize = (size: string) => {
    if (!sizes.includes(size)) {
      setSizes((prev) => [...prev, size]);
    }
  };

  const handleRemoveSize = (size: string) => {
    setSizes((prev) => prev.filter((s) => s !== size));
  };

  const handleAddColor = (color: string) => {
    if (!colors.includes(color)) {
      setColors((prev) => [...prev, color]);
    }
  };

  const handleRemoveColor = (color: string) => {
    setColors((prev) => prev.filter((c) => c !== color));
  };

  useEffect(() => {
  const savedSizes = JSON.parse(localStorage.getItem('selectedSizes') || 'null');
  const savedColors = JSON.parse(localStorage.getItem('selectedColors') || 'null');

  if (savedSizes && Array.isArray(savedSizes) && savedSizes.length > 0) {
    const isShort = shortSizeMap.includes(savedSizes[0]);
    setSizeStyle(isShort ? 'short' : 'full');
    setSizes(savedSizes);
  } else {
    setSizes(['medium', 'large']);
  }

  if (savedColors && Array.isArray(savedColors) && savedColors.length > 0) {
    setColors(savedColors);
  } else {
    setColors(['Red']);
  }
}, []);


  useEffect(() => {
    localStorage.setItem('selectedSizes', JSON.stringify(sizes));
    localStorage.setItem('selectedColors', JSON.stringify(colors));
  }, [sizes, colors]);

  return (
    <main className="flex relative flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <FormHeader
        step={2}
        totalSteps={3}
        title="Customer options"
        subtitle="Add product"
      />

      <div className="flex justify-end mb-2">
        <button
          onClick={handleToggleSizeStyle}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full"
        >
          Switch to {sizeStyle === 'full' ? 'short' : 'full'} sizes
        </button>
      </div>

      <section className="flex flex-col gap-6">
        <MultiSelect
          label="Choose available sizes"
          selectedItems={sizes}
          allOptions={currentSizeOptions}
          onAddItem={handleAddSize}
          onRemoveItem={handleRemoveSize}
        />

        <MultiSelect
          label="Choose available colors"
          selectedItems={colors}
          allOptions={allColors}
          onAddItem={handleAddColor}
          onRemoveItem={handleRemoveColor}
        />
      </section>

      <footer className="flex gap-4 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-0 h-14 text-base font-medium text-black cursor-pointer rounded-[50px]"
        >
          Cancel
        </button>
        <button
          onClick={onPrevious}
          className="px-4 py-0 h-14 text-base font-medium text-black cursor-pointer rounded-[50px]"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="px-4 py-0 h-14 text-base font-medium text-white bg-blue-600 cursor-pointer rounded-[50px]"
        >
          Next
        </button>
      </footer>

      <button
        onClick={onClose}
        className="flex absolute top-4 right-4 justify-center items-center w-14 h-14 rounded-lg"
        aria-label="Close"
      >
        <CloseCircleIcon />
      </button>
    </main>
  );
};

export default CustomerOptionsForm;
