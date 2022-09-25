import './footer.styles.scss';


const Footer = ({ name }) => {
  return (
    <div className='footer-container'>
      <p className='footer-text'>
        created by <a href='https://github.com/heleniolucas0420/' className='footer-text__name'>{name}</a> - 
        <a href='https://devchallenges.io/' className='footer-text__chalenge-link'> devChallenges.io </a>
      </p>
    </div>
  )
}


export default Footer;