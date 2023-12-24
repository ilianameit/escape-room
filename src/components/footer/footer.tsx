import { memo } from 'react';
import { footerSocials } from './consts';

function FooterComponent(): JSX.Element {
  return(
    <footer className="footer">
      <div className="container container--size-l">
        <div className="socials">
          <ul className="socials__list">
            {
              Object.entries(footerSocials).map(([soc, nameSoc]) => (
                <li key={soc} className="socials__item">
                  <a className="socials__link" href="#" aria-label={nameSoc} target="_blank" rel="nofollow noopener noreferrer">
                    <svg className="socials__icon socials__icon--default" width={28} height={28} aria-hidden="true">
                      <use xlinkHref={`#icon-${soc}-default`}></use>
                    </svg>
                    <svg className="socials__icon socials__icon--interactive" width={28} height={28} aria-hidden="true">
                      <use xlinkHref={`#icon-${soc}-interactive`}></use>
                    </svg>
                  </a>
                </li>
              )
              )
            }
          </ul>
        </div>
      </div>
    </footer>
  );
}

const Footer = memo(FooterComponent);
export default Footer;
