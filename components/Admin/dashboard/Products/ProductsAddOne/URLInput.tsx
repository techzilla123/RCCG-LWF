import { useState, useEffect } from 'react';
import { CaretDownIcon } from './Icons';

type URLInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const URLInput = ({ value, onChange }: URLInputProps) => {
  const [subdomain, setSubdomain] = useState('');
  const [domain, setDomain] = useState('.com');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const domainOptions = ['.com', '.net', '.org', '.co'];

  // Split initial value once on mount
  useEffect(() => {
    if (value.startsWith('https://')) {
      const raw = value.replace('https://', '');
      for (const d of domainOptions) {
        if (raw.endsWith(d)) {
          const sub = raw.slice(0, raw.length - d.length);
          setSubdomain(sub);
          setDomain(d);
          break;
        }
      }
    }
  }, []);

  // Compose full URL on subdomain/domain change
  useEffect(() => {
    const newUrl = `https://${subdomain}${domain}`;
    if (newUrl !== value) {
      onChange(newUrl);
    }
  }, [subdomain, domain]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (val: string) => {
    setDomain(val);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-base text-black max-md:text-sm max-sm:text-xs">
        URL
      </label>
      <div className="flex items-center bg-white rounded-lg border border-solid border-neutral-300 overflow-hidden">
        <span className="px-4 py-2 text-base text-neutral-500 bg-neutral-100 max-md:text-sm max-sm:text-xs">
          https://
        </span>
        <input
          type="text"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          placeholder="savicbirthdays"
          className="flex-1 px-2 py-2 text-base text-black outline-none max-md:text-sm max-sm:text-xs"
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="relative flex items-center px-4 py-2 text-base text-neutral-500 bg-neutral-100 max-md:text-sm max-sm:text-xs"
        >
          {domain}
          <span className="ml-1">
            <CaretDownIcon />
          </span>
        </button>
      </div>

      {isDropdownOpen && (
        <ul className="absolute right-0 mt-1 bg-white border border-neutral-300 rounded shadow z-10">
          {domainOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-neutral-100 cursor-pointer text-sm"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
