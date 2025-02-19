function HedaerLayout({ children }: { children: React.ReactNode }) {
  return (
    <header className="fixed max-w-[600px] min-w-[320px] w-full h-[44px] bg-secondary-1/80 backdrop-blur-sm px-3 flex items-center z-40">
      {children}
    </header>
  );
}

export default HedaerLayout;
