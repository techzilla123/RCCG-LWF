export const BorderElement = ({ className = '' }: { className?: string }) => {
    return (
      <div
        className={`flex absolute left-0 top-2/4 z-0 flex-col justify-center items-center self-start px-px w-0.5 h-5 border-t border-solid -translate-y-2/4 border-t-[color:var(--colour-fill-transparent,rgba(0,0,0,0.00))] min-h-5 translate-x-[0%] ${className}`}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/8af1ff7e3fa2f20e105ec607e78229d5f60ababb?placeholderIfAbsent=true"
          className="object-contain flex-1 w-0 stroke-[1px] stroke-neutral-300"
          alt=""
        />
      </div>
    );
  };