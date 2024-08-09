import { getUser } from "@/lib/actions/user.actions";
import LogoutButton from "./LogoutButton";

const Page = async () => {
  const user = await getUser();
  console.log(user)
  return (
    <>
      <p>{user?.username}</p>
      <LogoutButton /> 
    </>
  )
}

export default Page;