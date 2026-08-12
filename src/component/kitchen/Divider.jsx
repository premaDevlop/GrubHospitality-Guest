import Image from "next/image";

export default function Divider() {
  return (
    <div className="w-full flex justify-center py-[16px] px-[24px] md:px-[29px]">
      <Image
        src="/kitchen/divider.png"
        alt="divider"
        width={380}
        height={1}
        className="w-full h-auto"
      />
    </div>
  );
}
