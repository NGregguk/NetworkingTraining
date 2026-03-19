type OnThisPageItem = {
  href: string;
  id: string;
  label: string;
};

type OnThisPageNavProps = {
  activeId: string;
  items: OnThisPageItem[];
};

export default function OnThisPageNav({
  activeId,
  items,
}: OnThisPageNavProps) {
  return (
    <ul className="section-nav">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            className={
              activeId === item.id
                ? 'section-nav-link section-nav-link-active'
                : 'section-nav-link'
            }
            aria-current={activeId === item.id ? 'location' : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
