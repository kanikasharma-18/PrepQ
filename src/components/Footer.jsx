const links = ['GitHub', 'Privacy', 'Terms', 'Contact'];

function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-black/[0.06] dark:border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <span className="text-sm font-semibold text-neutral-900 dark:text-white">
          Prep<span className="text-accent-500">Q</span>
        </span>

        <ul className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
          {links.map((link) => (
            <li key={link}>
              <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} PrepQ. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;