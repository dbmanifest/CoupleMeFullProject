const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-background">
      {children}
    </div>
  );
};

export default AuthLayout;
