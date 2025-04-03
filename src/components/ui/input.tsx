import * as React from "react";

interface IInput extends React.ComponentProps<"input"> {
  id: string;
}

function Input({ className, type, id, ...props }: IInput) {
  //asdf
  return (
    <div className="relative">
      <input
        type="email"
        id={id}
        {...props}
        placeholder="Email address"
        className="peer w-full h-[60px] p-2 outline-none border border-gray-300 rounded-md placeholder-transparent focus:border-primary"
      />
      <label
        htmlFor={id}
        className="absolute left-[10px] top-1/2 -translate-y-1/2  bg-white px-1 transition-all peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm   peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
      >
        Email Address
      </label>
    </div>
  );
}
export { Input };
