import { InsideCardText } from '../CardComponents'
import { TabIMG } from '../GuidanceTabs'
import cat from '../../assets/cat_happy_1.png'
import fish from '../../assets/fish.png'
import journal from '../../assets/icons/pencil.svg'
import history from '../../assets/icons/history.svg'
import affirmation from '../../assets/heart_3.png'

interface TabItem {
  id: number
  title: string
  content: React.ReactNode
}

const GuidanceContent: TabItem[] = [
  {
    id: 0,
    title: 'Pet',
    content: (
      <>
        <InsideCardText>
          Take good care of your cat, or your cat will lose its mood! Complete
          todos, get food, and feed your cat to make it happy again!
        </InsideCardText>
        <TabIMG src={cat} alt="cat" />
      </>
    ),
  },
  {
    id: 1,
    title: 'Food',
    content: (
      <>
        <InsideCardText>
          Complete todos and you can get fish! Cats love to eat fish!
        </InsideCardText>
        <TabIMG src={fish} alt="fish" />
      </>
    ),
  },
  {
    id: 2,
    title: 'Todo',
    content: (
      <InsideCardText>
        Use our todo ist to remind yourself of your daily must-todos! Don't
        forget to complete them on time!
      </InsideCardText>
    ),
  },
  {
    id: 3,
    title: 'Journal',
    content: (
      <>
        <InsideCardText>
          You've completed a lot of todos! Is there anything you'd like to
          record today? Use a daily journal to summarize your day.
        </InsideCardText>
        <TabIMG src={journal} alt="journal" />
      </>
    ),
  },
  {
    id: 4,
    title: 'History',
    content: (
      <>
        <InsideCardText>
          History records your daily activity! Come on and complete your todos
          to get more steaks!
        </InsideCardText>
        <TabIMG src={history} alt="history" />
      </>
    ),
  },
  {
    id: 5,
    title: 'Affirmation',
    content: (
      <>
        <InsideCardText>
          Affirmation makes you feel good every day! You can also set the
          category you want in Affirmation!
        </InsideCardText>
        <TabIMG src={affirmation} alt="affirmation" />
      </>
    ),
  },
]

export default GuidanceContent
