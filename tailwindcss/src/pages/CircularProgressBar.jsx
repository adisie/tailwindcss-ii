import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const CircularProgressBar = () => {
  const percentage = 85;
  return (
    <div className="w-[200px] h-[200px]">
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={3}
        styles={buildStyles({
          rotation: 0.25,
          pathColor: "green",
          strokeLinecap: "butt",
        })}
      >
        <div className="flex items-center justify-center mt-5">
          <div className="flex flex-col">
            <div>
              <img
                src="https://th.bing.com/th/id/OIP.1LGZlsGKg-UJKVp1M3MdAQHaHa?rs=1&pid=ImgDetMain"
                className="w-[130px] h-[130px] rounded-full"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center text-xl text-green-600 font-black">
              <span>{percentage}%</span>
            </div>
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularProgressBar;
