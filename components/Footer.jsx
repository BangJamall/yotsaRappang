import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container">
      <div className="flex flex-col md:flex-row justify-between items-center py-section-gap-mobile md:py-12 px-gutter max-w-container-max mx-auto gap-8">
        <div className="font-headline-md text-headline-md font-bold text-on-surface">
          VibrantLocal
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link className="text-on-surface-variant hover:text-secondary transition-colors font-label-sm text-label-sm" href="#">
            Privacy Policy
          </Link>
          <Link className="text-on-surface-variant hover:text-secondary transition-colors font-label-sm text-label-sm" href="#">
            Terms of Service
          </Link>
          <Link className="text-on-surface-variant hover:text-secondary transition-colors font-label-sm text-label-sm" href="#">
            Shipping Info
          </Link>
          <Link className="text-on-surface-variant hover:text-secondary transition-colors font-label-sm text-label-sm" href="#">
            Wholesale
          </Link>
        </div>
        <div className="font-body-md text-body-md text-on-surface-variant">
          © 2024 VibrantLocal SME. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
