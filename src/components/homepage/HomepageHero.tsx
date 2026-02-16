import Button from "../Button";
import { useNavigate } from "react-router-dom";

const HomepageHero = ({ imageUrl, title, subtitle, buttonUrl, buttonText }: { imageUrl: string, title: string, subtitle: string, buttonUrl: string, buttonText: string }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[100vh] md:h-[75vh]">
      {/* Overlay over the image */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
      {/* Image */}
      <img src={imageUrl} alt="Hero Image" className="absolute top-0 left-0 w-full h-full object-cover" />
      {/* Content container on the left */}
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2 z-20 flex flex-col items-start justify-center text-left px-8 md:px-12">
        <h1 className="text-2xl md:text-5xl font-bold text-white">{title}</h1>
        <p className="text-white text-lg md:text-xl">{subtitle}</p>
        <div className="flex mt-4">
          <Button text={buttonText} onClick={() => { navigate(buttonUrl); }} variant="primary" />
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
