const links = ['GitHub', 'Privacy', 'Terms', 'Contact'];

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-black/[0.04] dark:border-white/[0.06] bg-neutral-50/20 dark:bg-neutral-950/20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-sm font-bold tracking-tight text-neutral-950 dark:text-white">
          Prep<span className="text-accent-500">Q</span>
        </span>

        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-450">
          {links.map((link) => (
            <li key={link}>
              <a href="#" className="hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          © {new Date().getFullYear()} PrepQ. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;