import { MagicCard } from "@/components/magicui/magic-card";
import { getUser } from "@/lib/actions/user.actions";

const Page = async () => {

  const user = await getUser()

 return (
  <div
      className={
        "flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row"
      }
    >
    <MagicCard
      className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl w-[50%]"
      gradientColor={"#D9D9D955"}
    >
      Click to buy mf ({user.username})
    </MagicCard>
  </div>
 )
}

export default Page;