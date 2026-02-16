import {
  HandThumbUpIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import HomepageHero from "../components/homepage/HomepageHero.tsx";
import UspComponent from "../components/homepage/UspComponent.tsx";
import FeaturedProducts from "../components/homepage/FeaturedProducts.tsx";
import type { UspItem } from "../components/homepage/UspComponent.tsx";
import HeroImage from "../assets/homepage/greenhouse-hero-image.jpg";

const iconClassName = "h-full w-full";

const uspItems: UspItem[] = [
  {
    title: "Vers van eigen bodem",
    description: "Alle planten zijn gekweekt in het Westland.",
    icon: <HandThumbUpIcon className={iconClassName} />,
  },
  {
    title: "Kwaliteit garantie",
    description: "Alle planten zijn van hoge kwaliteit.",
    icon: <ShieldCheckIcon className={iconClassName} />,
  },
  {
    title: "Gratis levering",
    description: "Alle planten worden gratis geleverd.",
    icon: <TruckIcon className={iconClassName} />,
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <HomepageHero
        imageUrl={HeroImage}
        buttonUrl="/producten"
        buttonText="Producten"
        title="Haal de natuur in huis"
        subtitle="Ontdek onze unieke collectie kamerplanten, gekweekt in het Westland, perfect voor jouw huis."
      />
      <UspComponent
        title="Waarom kiezen voor planten van Annie"
        subtitle="We kweken elke plant met zorg, van zaad tot bij jou thuis."
        items={uspItems}
      />
      <FeaturedProducts title="Uitgelichte planten" subtitle="Ontdek onze unieke collectie kamerplanten, gekweekt in het Westland, perfect voor jouw huis." productAmount={4} />
    </div>
  );
};

export default HomePage;
