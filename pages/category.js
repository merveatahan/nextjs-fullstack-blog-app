import { useSession } from "next-auth/react";
import React from "react";

function Category() {
  const session = useSession();
  console.log(session);
  return <div>Category</div>;
}

export default Category;
