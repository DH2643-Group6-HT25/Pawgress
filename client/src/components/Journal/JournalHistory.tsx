import type { Journal } from '../../models/journal/journalType';
import moment from 'moment';
import { sortBy, filter } from 'lodash/fp';
import { 
  JournalEntryCard, 
  JournalListContainer, 
  CardDate, 
  CardText,
  CardBottomRow,
  CardImageWrapper,
  JournalImage,
  TrashWrapper
} from '../Journal/JournalCardComponents';
import { CardIcon } from '../CardComponents';
import trashIcon from '../../assets/icons/remove.svg';
import { getImageUrl } from '../../utils/imageUrl';

// Helper to render formatted text (basic bold/italic/underline)
function renderFormattedText(journal: Journal) {
  return <span dangerouslySetInnerHTML={{ __html: journal.journal }} />;
}


interface Props {
  journals: Journal[];
  onDelete?: (id: string) => void;
}

export default function JournalHistory({ journals, onDelete }: Props) {
  // Filter out invalid journals and sort by date descending (newest first)
  const validJournals = filter((j: Journal) => !!j.date && !!j.journal, journals);
  const sortedJournals = sortBy('date', validJournals).reverse();
  return (
    <JournalListContainer>
      {sortedJournals.map((j: Journal) => (
        <JournalEntryCard key={j._id} style={{ position: 'relative' }}>
          <CardDate>{moment(j.date).format('DD/MM/YYYY')}</CardDate>
          <CardText>{renderFormattedText(j)}</CardText>
          <CardBottomRow>
            <CardImageWrapper>
              {j.imageUrl && <JournalImage src={getImageUrl(j.imageUrl)} alt="journal" />}
            </CardImageWrapper>
            {typeof onDelete === 'function' && (
              <TrashWrapper>
                <CardIcon
                  src={trashIcon}
                  alt="Delete"
                  title="Delete journal"
                  onClick={() => onDelete(j._id)}
                  tabIndex={0}
                  onKeyDown={(e: React.KeyboardEvent<HTMLImageElement>) => { if (e.key === 'Enter' || e.key === ' ') onDelete(j._id); }}
                />
              </TrashWrapper>
            )}
          </CardBottomRow>
        </JournalEntryCard>
      ))}
    </JournalListContainer>
  );
}