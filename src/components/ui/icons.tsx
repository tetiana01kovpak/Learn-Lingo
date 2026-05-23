import type { SVGProps } from 'react';

export const HeartIcon = ({ filled = false, ...props }: { filled?: boolean } & SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 26 26" fill={filled ? 'currentColor' : 'none'} aria-hidden="true" {...props}>
    <path
      d="M12.62 5.46l.38.43.38-.43c2.27-2.49 5.95-2.49 8.22 0 2.24 2.45 2.24 6.4 0 8.85L13 22.94l-8.6-8.63c-2.24-2.45-2.24-6.4 0-8.85 2.27-2.49 5.95-2.49 8.22 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 1.2l2.2 4.4 4.9.7-3.5 3.4.8 4.9L8 12.3 3.6 14.6l.8-4.9L.9 6.3l4.9-.7L8 1.2z" />
  </svg>
);

export const BookOpenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path
      d="M1.33 2.67h4c.74 0 1.34.6 1.34 1.33v9.33c0-.73-.6-1.33-1.34-1.33h-4V2.67zM14.67 2.67h-4c-.74 0-1.34.6-1.34 1.33v9.33c0-.73.6-1.33 1.34-1.33h4V2.67z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path
      d="M5 7.5l5 5 5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LogInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path
      d="M10.83 13.33L14.17 10l-3.34-3.33M2.5 10h11.67M7.5 3.33h4.17a3.33 3.33 0 013.33 3.34v6.66a3.33 3.33 0 01-3.33 3.34H7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LogOutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path
      d="M9.17 13.33L5.83 10l3.34-3.33M17.5 10H5.83M12.5 16.67h-4.17A3.33 3.33 0 015 13.33V6.67a3.33 3.33 0 013.33-3.34h4.17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const EyeOffIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M2 2l20 20M6.71 6.7C3.8 8.55 2 12 2 12s3.5 7 10 7c2.05 0 3.8-.46 5.3-1.15M14.5 14.5a3 3 0 11-4-4M10.5 9.5c.43-.32.95-.5 1.5-.5a3 3 0 013 3c0 .55-.18 1.07-.5 1.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FlagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" aria-hidden="true" {...props}>
    <circle cx="14" cy="14" r="14" fill="#338af3" />
    <path d="M0 14h28v14H0z" fill="#ffda44" />
  </svg>
);
