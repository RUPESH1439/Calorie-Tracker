import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import Navbar from "./Navbar";

interface LayoutProps {
  children: JSX.Element;
}
const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { isAdmin, user } = useContext(UserContext);
  useEffect(() => {
    if (!user && router?.pathname != "/") {
      router?.push("/");
    }
    if (router?.pathname?.includes("admin")) {
      if (!isAdmin) {
        router?.push("/");
      }
    }
  }, [router, user]);

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          py: "3%",
          px: "3%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
