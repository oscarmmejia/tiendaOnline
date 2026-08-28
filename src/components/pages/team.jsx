import Footer from '../footer/Footer.jsx'
import memberOne from '../../img/team/teamMember1.png'
import memberTwo from '../../img/team/teamMember2.png'
import memberThree from '../../img/team/teamMember3.png'
import memberFour from '../../img/team/teamMember4.png'
import memberFive from '../../img/team/teamMember5.png'
import '../../styles/team.css'

const teamMembers = [
	{
		src: memberOne,
		level: 'NIVEL 5',
		name: 'Juan Camilo Piamba Uribe',
		role: 'CURADOR DE PRODUCTOS',
		description: 'Selecciona los dispositivos y accesorios más avanzados de la red. Cada producto debe combinar diseño, utilidad e innovación antes de llegar a la tienda.',
		tags: ['SELECCIÓN', 'DISEÑO TECH'],
	},
	{
		src: memberTwo,
		level: 'NIVEL 8',
		name: 'Jesús González Gómez',
		role: 'ESPECIALISTA EN TECNOLOGÍA',
		description: 'Prueba cada gadget inteligente y traduce sus funciones en recomendaciones claras para encontrar la tecnología perfecta para cada usuario.',
		tags: ['GADGETS', 'I+D'],
	},
	{
		src: memberThree,
		level: 'NIVEL 7',
		name: 'Oscar Mauricio de Jesús Mejía Pernía',
		role: 'DIRECTOR DE INNOVACIÓN',
		description: 'Explora las tendencias del futuro y convierte ideas experimentales en nuevas categorías de productos para nuestro marketplace.',
		tags: ['INNOVACIÓN', 'FUTURE LAB'],
	},
	{
		src: memberFour,
		level: 'NIVEL 7',
		name: 'Moisés García Sanz',
		role: 'OPERADOR DE LOGÍSTICA',
		description: 'Coordina el viaje de cada pedido desde el nodo de distribución hasta la puerta del cliente, con entregas rápidas y seguimiento en tiempo real.',
		tags: ['LOGÍSTICA', 'SMART DELIVERY'],
	},
    {
		src: memberFive,
		level: 'NIVEL 7',
		name: 'Cristina Rodríguez López',
		role: 'ESTRATEGA DE EXPERIENCIA',
		description: 'Diseña una experiencia de compra intuitiva y futurista, conectando las necesidades de cada cliente con los productos más innovadores del catálogo.',
		tags: ['UX FUTURISTA', 'CLIENTE 360'],
	},
]

function Team() {
	return (
		<>
			<main className="team-main">
				<section className="team-hero">
					<p className="team-eyebrow">OPERATIVOS DE RED</p>
					<h1>NUESTRO EQUIPO</h1>
					<p className="team-intro">Los arquitectos del mañana. Nuestro sindicato de especialistas en hardware, neuro-logística y comercio digital avanzado operando desde las sombras del neón.</p>
				</section>

				<section className="team-grid" aria-label="Miembros del equipo">
					{teamMembers.map((member, index) => (
						<article className="team-card" key={member.name}>
							<div className="team-image-wrap">
								<img className={`team-image ${index === 0 ? 'team-image-first' : ''} ${index === 3 ? 'team-image-fourth' : ''}`} src={member.src} alt={member.name} />
								<span className="team-level">{member.level}</span>
							</div>
							<div className="team-card-content">
								<h2>{member.name}</h2>
								<p className="team-role">&gt; {member.role}</p>
								<p className="team-description">{member.description}</p>
								<div className="team-tags">
									{member.tags.map((tag) => <span key={tag}>{tag}</span>)}
								</div>
							</div>
						</article>
					))}
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Team
