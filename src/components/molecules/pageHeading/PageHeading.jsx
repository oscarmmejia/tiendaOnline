import './PageHeading.css'

const PageHeading = ({ title, description }) => {
	return (
		<header className="pageHeading">
			<h1 className="pageHeadingTitle">{title}</h1>
			<p className="pageHeadingDescription">{description}</p>
		</header>
	)
}

export default PageHeading
