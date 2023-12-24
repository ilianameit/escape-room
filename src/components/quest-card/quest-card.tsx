import { Link } from 'react-router-dom';
import { QuestPreview } from '../../types/quest-preview';
import { AppRoutes, dateBooking, definitionLevels } from '../../const/const';
import { Reservation } from '../../types/reservation';

type QuestCardProps = {
  quest: QuestPreview;
  reservation?: Reservation;
  onCancelReserveClick?: (id: Reservation['id']) => void;
}

function QuestCard({quest, reservation, onCancelReserveClick}: QuestCardProps): JSX.Element {
  const {id, title, previewImgWebp, previewImg, level, peopleMinMax} = reservation?.quest || quest;
  const [peopleMin, peopleMax] = peopleMinMax;

  const handleCancelReserveClick = () => {
    if(reservation && reservation.id){
      onCancelReserveClick?.(reservation.id);
    }
  };

  return(
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg} 2x`}
            width={344}
            height={232}
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${AppRoutes.Quest}${id}`}>{title}</Link>
          {reservation && (
            <span className="quest-card__info">[{
              <>
                {dateBooking[reservation.date]},&nbsp;{reservation.time}. {reservation.location.address}
              </>
            }]
            </span>
          )}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>
            {!reservation ?
              (
                <>
                  {peopleMin}
                  &ndash;
                  {peopleMax}
                  &nbsp;
                  чел
                </>
              ) :
              (<>{reservation.peopleCount}&nbsp;чел </>)}
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>
            {definitionLevels[level]}
          </li>
        </ul>
        {
          reservation && (
            <button className="btn btn--accent btn--secondary quest-card__btn" type="button" onClick={handleCancelReserveClick}>Отменить</button>
          )
        }
      </div>
    </div>

  );
}

export default QuestCard;
