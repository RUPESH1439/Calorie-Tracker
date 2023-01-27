import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import SignIn from "../components/SignIn";
import { UserContext } from "../contexts/userContext";

const Index: NextPage = () => {
  const router = useRouter();

  const { user: currentUser, fetchCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser?.id) {
      if (currentUser?.role === "regular") {
        router.push("/home");
      }
      if (currentUser?.role === "admin") {
        router.push("/admin/report");
      }
    }
  }, [currentUser]);

  return (
    <>
      <SignIn onSignInSuccess={() => fetchCurrentUser()} />
    </>
  );
};

export default Index;
