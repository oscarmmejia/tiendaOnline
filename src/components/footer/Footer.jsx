import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footerContainer">
            <section className="footerContent">
            
                <div className="footerLeft">
                    <div className="footerLogo">
                        <div className="footerLogoIcono">⌘</div>
                        <span className="logoOky">
                            OKY<span className="logoDoky">DOKY</span>
                        </span>
                    </div>
                    <p className="footerText">
                        El nodo comercial descentralizado de confianza. Suministrando
                        hardware y la vestimenta más top de la red global.
                    </p>
                    <div className="footerRedes">
                        <a href="#" className="footerRedIcono" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
                            </svg>
                        </a>
                        <a href="#" className="footerRedIcono" aria-label="Twitter">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M23 5.1c-.8.4-1.7.6-2.6.8a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1a4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2.5 4a4.5 4.5 0 0 0 1.4 6 4.4 4.4 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4c-.6.2-1.3.2-1.9.1a4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 19.5 12.7 12.7 0 0 0 7.9 21.5c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.3z" />
                            </svg>
                        </a>
                        <a href="#" className="footerRedIcono" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="#" className="footerRedIcono" aria-label="YouTube">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="5" width="20" height="14" rx="4" />
                                <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                    </div>
                </div>

               
                <div className="footerColumn">
                    <h3 className="footerColumnTitulo">Sectores</h3>
                    <ul className="footerColumnLista">
                        <li><a href="#">Ropa</a></li>
                        <li><a href="#">Electrónica</a></li>
                        <li><a href="#">Muebles</a></li>
                        <li><a href="#">Calzado</a></li>
                        <li><a href="#">Misceláneos</a></li>
                    </ul>
                </div>

                
                <div className="footerColumn">
                    <h3 className="footerColumnTitulo">Compañía</h3>
                    <ul className="footerColumnLista">
                        <li><a href="#">Nuestra Historia</a></li>
                        <li><a href="#">Vendedores</a></li>
                        <li><a href="#">Usuarios</a></li>
                        <li><a href="#">Vitrina</a></li>
                    </ul>
                </div>

             
                <div className="footerColumn">
                    <h3 className="footerColumnTitulo">Estado del nodo</h3>
                    <div className="footerBadges">
                        <span className="footerBadge">
                            <span className="footerBadgePunto" />
                            PING: 14MS (OPTIMAL)
                        </span>
                        <span className="footerBadge">
                            <span className="footerBadgePunto" />
                            SECURITY: IMPENETRABLE
                        </span>
                    </div>
                </div>
            </section>

            <div className="footerLinea" />

            <div className="footerVersion">
                OKYDOKY CORE V2.06 — TRANSMISSION SECURED
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