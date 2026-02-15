import HomepageHero from "../components/homepage/HomepageHero";
import HeroImage from "../assets/homepage/greenhouse-hero-image.jpg";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
        <HomepageHero imageUrl={HeroImage} buttonUrl="/producten" buttonText="Producten" title="Haal de natuur in huis" subtitle="Ontdek onze unieke collectie kamerplanten, vers van eigen bodem, perfect voor jouw huis." />
    </div>
  );
}

export default HomePage;
