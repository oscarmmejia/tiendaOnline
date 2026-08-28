import memberOne from '../../img/team/teamMember1.png'
import memberTwo from '../../img/team/teamMember2.png'
import memberThree from '../../img/team/teamMember3.png'
import memberFour from '../../img/team/teamMember4.png'
import memberFive from '../../img/team/teamMember5.png'
import './Team.css'

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
			<main className="teamMain">
				<section className="teamHero">
					<p className="teamEyebrow">OPERATIVOS DE RED</p>
					<h1>NUESTRO EQUIPO</h1>
					<p className="teamIntro">Los arquitectos del mañana. Nuestro sindicato de especialistas en hardware, neuro-logística y comercio digital avanzado operando desde las sombras del neón.</p>
				</section>

				<section className="teamGrid" aria-label="Miembros del equipo">
					{teamMembers.map((member, index) => (
						<article className="teamCard" key={member.name}>
							<div className="teamImageWrap">
								<img className={`teamImage ${index === 0 ? 'teamImageFirst' : ''} ${index === 3 ? 'teamImageFourth' : ''}`} src={member.src} alt={member.name} />
								<span className="teamLevel">{member.level}</span>
							</div>
							<div className="teamCardContent">
								<h2>{member.name}</h2>
								<p className="teamRole">&gt; {member.role}</p>
								<p className="teamDescription">{member.description}</p>
								<div className="teamTags">
									{member.tags.map((tag) => <span key={tag}>{tag}</span>)}
								</div>
							</div>
						</article>
					))}
				</section>
			</main>
		</>
	)
}

export default Team
