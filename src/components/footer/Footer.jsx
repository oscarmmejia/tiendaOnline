import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footerContainer">
            <section className="footerContent">
                <div className="footerBrand">
                    <div className="footerLogo">
                        <div className="footerLogoIcon">⌘</div>
                        <span className="logoOky">
                            OKY<span className="logoDoky">DOKY</span>
                        </span>
                    </div>
                    <p className="footerText">
                        El nodo comercial descentralizado de confianza. Suministrando
                        hardware y la vestimenta más top de la red global.
                    </p>
                    <div className="footerSocials">
                        <a href="https://www.facebook.com/" className="footerSocialIcon" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
                            </svg>
                        </a>
                        <a href="https://www.x.com/" className="footerSocialIcon" aria-label="Twitter">
                            <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/" className="footerSocialIcon" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/" className="footerSocialIcon" aria-label="YouTube">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="5" width="20" height="14" rx="4" />
                                <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="footerColumn">
                    <h3 className="footerColumnTitle">Sectores</h3>
                    <ul className="footerColumnList">
                        <li><a href="#">Ropa</a></li>
                        <li><a href="#">Electrónica</a></li>
                        <li><a href="#">Muebles</a></li>
                        <li><a href="#">Calzado</a></li>
                        <li><a href="#">Misceláneos</a></li>
                    </ul>
                </div>

                <div className="footerColumn">
                    <h3 className="footerColumnTitle">Compañía</h3>
                    <ul className="footerColumnList">
                        <li><a href="#">Nuestra Historia</a></li>
                        <li><a href="#">El Equipo</a></li>
                        <li><a href="#">Usuarios</a></li>
                        <li><a href="#">Vitrina</a></li>
                    </ul>
                </div>

                <div className="footerColumn">
                    <h3 className="footerColumnTitle">Estado del nodo</h3>
                    <div className="footerBadges">
                        <span className="footerBadge">
                            <span className="footerBadgeDot" />
                            PING: 14MS (OPTIMAL)
                        </span>
                        <span className="footerBadge">
                            <span className="footerBadgeDot" />
                            SECURITY: IMPENETRABLE
                        </span>
                    </div>
                </div>
            </section>

            <div className="footerDividers">
                <div className="footerDividerCyan" />
                <span className="footerVersion">
                    OKYDOKY CORE V2.06 — TRANSMISSION SECURED
                </span>
                <div className="footerDividerMagenta" />
            </div>

            <div className="footerBottom">
                <span>
                    © 2026 OKYDOKY Marketplace Inc. Todos los derechos reservados bajo
                    la Enmienda de Datos de Neo City.
                </span>
                <span className="footerBypass">BYPASS PRIVACY PROXY // ON</span>
            </div>
        </footer>
    );
};

export default Footer;