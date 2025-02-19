function HedaerLayout({ children }: { children: React.ReactNode }) {
  return (
    <header className="fixed max-w-[600px] w-full h-[44px] bg-[#FBF5FF]/90 backdrop-blur-sm px-3 flex items-center">
      {children}
    </header>
  );
}

export default HedaerLayout;
