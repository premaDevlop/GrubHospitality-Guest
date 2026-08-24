export default function FoodSkeleton() {
  return (
    <div className="w-full min-w-0 flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-[412/309] bg-neutral-100" />

      {/* Info Skeleton */}
      <div className="w-full flex flex-col gap-[16px] p-[16px] bg-white rounded-[8px] shadow-[0px_0px_4px_rgba(0,0,0,0.1),4px_4px_8px_rgba(0,0,0,0.12)] -mt-[40px] relative z-10 mx-auto max-w-[calc(100%-48px)]">
        {/* Name Skeleton */}
        <div className="h-[32px] w-[200px] bg-neutral-100 rounded" />

        {/* Cuisine Tags Skeleton */}
        <div className="flex items-center gap-[8px]">
          <div className="h-[16px] w-[60px] bg-neutral-100 rounded" />
          <div className="h-[16px] w-[8px] bg-neutral-100 rounded" />
          <div className="h-[16px] w-[70px] bg-neutral-100 rounded" />
          <div className="h-[16px] w-[8px] bg-neutral-100 rounded" />
          <div className="h-[16px] w-[80px] bg-neutral-100 rounded" />
        </div>

        {/* Description Skeleton */}
        <div className="flex flex-col gap-[8px]">
          <div className="h-[16px] w-full bg-neutral-100 rounded" />
          <div className="h-[16px] w-[80%] bg-neutral-100 rounded" />
        </div>
      </div>
    </div>
  );
}
