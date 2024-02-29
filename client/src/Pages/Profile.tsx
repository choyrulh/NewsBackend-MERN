// import React from "react";

import { UserLogin } from "../hooks/UserProvider";

function Profile() {
  const { user } = UserLogin();

  console.log(user);
  return (
    <div className="text-black text-xl">
      <div>{user?.name}</div>
      <div>{user?.email}</div>
      <div>{user?.role}</div>
    </div>
  );
}

export default Profile;
