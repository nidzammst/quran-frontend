export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-50 overflow-hidden overflow-y-hidden -mt-4 max-sm:-mt-12">
      {children}
    </div>
  );
}
