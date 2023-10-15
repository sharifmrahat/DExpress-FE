const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <Layout hasSider>
    //   <SideBar />
    //   <Contents>{children}</Contents>
    // </Layout>
    <div>{children}</div>
  );
};

export default DashboardLayout;
