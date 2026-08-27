import heroBackground from "../../assets/heroBackground.png";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <img
        className="heroBackground"
        src={heroBackground}
        alt=""
        aria-hidden="true"
      />
      <div className="heroShade" aria-hidden="true" />

      <div className="heroContent">
        <div className="protocolLabel">
          <span className="protocolLine protocolLineCyan" />
          <span>Secure Quantum Protocol</span>
          <span className="protocolLine protocolLinePink" />
        </div>

        <h1 className="heroTitle" id="heroTitle">
          OKYDOKY
        </h1>

        <p className="heroDescription">
          El principal marketplace del mañana. ¡Adquiere hardware, prendas de
          vestir, muebles y hasta calzado!
        </p>
      </div>
    </section>
  );
};

export default Hero;
