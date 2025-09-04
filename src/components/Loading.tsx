import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="relative w-screen h-[calc(100vh-132px)] mt-[36px]">
      <CircularProgress className="absolute top-1/2 left-1/2 translate-1/2" color="secondary" />
    </div>
  );
};

export default Loading;
