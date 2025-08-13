import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './LessonPlan.module.css';
import Card from '../common/Card/Card';
import PieChart from '../common/PieChart/PieChart';
import Spinner from '../common/Spinner';
import { IoReload } from "react-icons/io5";
import { FiBook, FiUsers, FiUser, FiChevronLeft, FiChevronRight, FiThumbsUp, FiThumbsDown, FiTrendingUp } from 'react-icons/fi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import MuiPieChart from '../common/MuiPieChart'; 
import { LuNotebookPen } from "react-icons/lu";
import ClassChart1 from '../common/PieChart/ClassChart1';
import ClassChart2 from '../common/PieChart/ClassChart2';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"; // ADD THIS if not already imported
import IndividualChart1 from '../common/PieChart/IndividualChart1';

const MOCK_DATA = {
    positiveInsights: [
        { type: 'student_increase', icon: FiTrendingUp, text: 'Good news! Student Tesse improved her score by 30%, showing great progress on Fractions.' },
        { type: 'student_increase', icon: FiTrendingUp, text: 'Fantastic work from Raúl, who has mastered the concepts he struggled with last week.' },
        { type: 'student_increase', icon: FiTrendingUp, text: 'Kevin and Charlotte both achieved a perfect score on the latest quiz!' }
    ],
    initialInsights: [
        { type: 'class', icon: HiOutlineUserGroup, text: 'De klas heeft moeite met opgave 1 en 2. Herhaal deze opgaves klassikaal en controleer de veelgemaakte fouten.', isAlert: true },
        { type: 'group', icon: FiUsers, text: 'Nicole, Anh en Noah hebben dezelfde fouten gemaakt bij opgave 1, opgave 3 en opgave 6. Neem deze leerlingen apart en bespreek de fouten samen.', isAlert: true },
        { type: 'student_decrease', icon: FiUser, text: 'Enrico scoorde 30% lager ten opzichte van de week ervoor. Bespreek dit met Enrico en behandel de opdrachten individueel.',  isAlert: true },
    ],
    regeneratedPlan: [
        { type: 'class', icon: HiOutlineUserGroup, text: 'Go over and solve Q1, Q2, Q3 in front of the class.', isDetail: true },
        { type: 'group', icon: FiUsers, text: 'Students Nicole, Anh, and Noah should practice Q1, Q2, Q6 together.', isAlert: true },
        { type: 'student', icon: FiUser, text: 'Assign remedial worksheet "Fractions 101" to Enrico.', isAlert: true },
    ],
    detailItem: {
        title: "Go over and solve Q1, Q2, Q3 in front of the class.",
        avgCorrectP1: 80,
        avgCorrectQ123: 70,
        analysis: "Uit de bovenstaande informatie blijkt dat er een lage correctheid per opgave is. Bij paragraaf 1 scoorde de klas 80%, terwijl er bij opgave 1, opgave 3 en opgave 6 een percentage van 50% werd behaald.",
        suggestion: "De klas heeft moeite met opgave 1 en 2. Herhaal deze opgaves klassikaal en controleer de veelgemaakte fouten."
    }
};

const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const listItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
};


const LessonPlan = () => {
    const [view, setView] = useState('initial');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleToggleView = () => {
        setIsLoading(true);
        setTimeout(() => {
            setView(currentView => currentView === 'initial' ? 'regenerated' : 'initial');
            setIsLoading(false);
        }, 1000);
    };

    const handleShowDetail = () => setView('detail');
    const handleBackToInitial = () => setView('initial');
    
    return (
        <Card>
            <div className={styles.heroSection}>
              <div className={styles.heroTitleRow}>
                <div className={styles.titleLeft}>
                  <button className={styles.backButton}>
        <FiChevronLeft />
      </button>
                  <LuNotebookPen className={styles.titleIcon} />
                  <h1 className={styles.heroTitle}>Jouw Lesplan</h1>
                </div>
                <div className={styles.titleRight}>Meten en Meetkunde</div>
              </div>
              <div className={styles.subtitle}>Week 8: 20 Oktober - 26 Oktober</div>
            </div>

            <div className={styles.contentArea}>
                 {/* {view === 'detail' && (
                     <button onClick={handleBackToInitial} className={styles.backButton}>
                        <FiChevronLeft />
                    </button>
                )} */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {view === 'initial' && (
                        <InitialView 
                            otherInsights={MOCK_DATA.initialInsights} 
                            positiveInsights={MOCK_DATA.positiveInsights} 
                            onShowDetail={handleShowDetail}
                        />
                        )}            
                        {view === 'regenerated' && <RegeneratedView planItems={MOCK_DATA.regeneratedPlan} onShowDetail={handleShowDetail} />}
                        {view === 'detail' && <DetailView data={MOCK_DATA.detailItem} onBack={handleBackToInitial} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Card>
    );
};

const PositiveFeedbackCarousel = ({ items }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const itemIndex = ((page % items.length) + items.length) % items.length;

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };
    const currentItem = items[itemIndex];
    const IconComponent = currentItem.icon;

    return (
        <div className={styles.carouselContainer}>
            <button className={`${styles.carouselNavButton} ${styles.prev}`} onClick={() => paginate(-1)}>
                <FiChevronLeft />
            </button>
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={page}
                    custom={direction}
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className={styles.positiveInsightPanel}
                >
                    <IconComponent className={styles.icon} />
                    <div className={styles.textContainer}>{currentItem.text}</div>
                </motion.div>
            </AnimatePresence>
            <button className={`${styles.carouselNavButton} ${styles.next}`} onClick={() => paginate(1)}>
                <FiChevronRight />
            </button>
        </div>
    );
};

const InitialView = ({ otherInsights, positiveInsights, onShowDetail }) => (
  <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className={styles.listContainer}>
    {otherInsights.map((item, index) => (
      <motion.div key={index} variants={listItemVariants}>
        <div
          className={`${styles.listItemPanel} ${styles.clickable}`}
          onClick={() => {
            if (index === 0) {
              onShowDetail();
            } else {
              alert("Showing details for this insight...");
            }
          }}
        >
          <item.icon className={styles.icon} />
          <div className={styles.textContainer}>
            {item.text}
          </div>
          <FiChevronRight className={styles.arrowIcon} />
        </div>
      </motion.div>
    ))}
    {positiveInsights && positiveInsights.length > 0 && (
      <motion.div variants={listItemVariants}>
        <PositiveFeedbackCarousel items={positiveInsights} />
      </motion.div>
    )}
  </motion.div>
);

const RegeneratedView = ({ planItems, onShowDetail }) => (
    <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className={styles.listContainer}>
        {planItems.map((item, index) => {
            const action = item.isDetail ? onShowDetail : () => alert("Showing details for this item...");

            return (
                <motion.div key={index} variants={listItemVariants}>
                    <div 
                        className={`${styles.listItemPanel} ${styles.clickable}`}
                        onClick={action}
                    >
                        <item.icon className={styles.icon} />
                        <div className={styles.textContainer}>{item.text}</div>
                        <FiChevronRight className={styles.arrowIcon} />
                    </div>
                </motion.div>
            );
        })}
    </motion.div>
);

const mockData = {
  greenCount: 10,
  yellowCount: 8,
  redCount: 5,
  averageGrade: 6.1,
  fullCompletionCount: 11,
  aboveHalfCompletionCount: 5,
  belowHalfCompletionCount: 7,
};

const mockData2 = {
  averageGrade: 75,
  studentsGrades: [
    { name: "Anh", grade: 82 },
    { name: "Tesse", grade: 68 },
    { name: "Enrico", grade: 90 },
    { name: "Emma", grade: 74 },
    { name: "Sven", grade: 70 },
    { name: "Stan", grade: 77 },
    { name: "Sofie", grade: 79 },
    { name: "Issabella", grade: 64 },
    { name: "Tygo", grade: 81 },
    { name: "Jan", grade: 72 },
    { name: "Caitlyn", grade: 85 },
    { name: "Roos", grade: 69 },
    { name: "Reda", grade: 75 },
    { name: "Levi", grade: 62 },
    { name: "Sami", grade: 78 },
    { name: "Sahira", grade: 73 },
    { name: "Kevin", grade: 91 },
    { name: "Charlotte", grade: 76 },
    { name: "Raúl", grade: 60 },
  ],
};

const mockDataInd = {
  classCorrect: 75,
  classMade: 60,
  individualCorrect: 40,
  individualMade: 65
};

const DetailView = ({ data, onBack }) => {
  const [feedback, setFeedback] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [currentChart, setCurrentChart] = useState(0);

  const charts = [
    <ClassChart1 key="chart1" data={mockData} />,
    <ClassChart2 key="chart2" data={mockData2} />
  ];

  const handleFeedbackClick = (type) => {
    setFeedback(type);
    setFeedbackSubmitted(true);
  };

  const prevChart = () => setCurrentChart((prev) => (prev === 0 ? charts.length - 1 : prev - 1));
  const nextChart = () => setCurrentChart((prev) => (prev === charts.length - 1 ? 0 : prev + 1));

  return (
    <div className={styles.detailContainer}>
  <div className={styles.carouselOuter}>
    <div className={styles.carouselWrapper}>
      <button onClick={prevChart} className={`${styles.carouselNavButton} ${styles.left}`} title="Vorige">
        <FaChevronLeft />
      </button>

      <div className={styles.chartContainer}>
        {charts[currentChart]}
      </div>

      <button onClick={nextChart} className={`${styles.carouselNavButton} ${styles.right}`} title="Volgende">
        <FaChevronRight />
      </button>
    </div>
  </div>
  {/* <IndividualChart1 data={mockDataInd} /> */}
  <hr className={styles.separator} />

      <div className={`${styles.textBox} ${styles.orangeBorder}`}>
        <p>{data.analysis}</p>
      </div>
      <div className={`${styles.textBox} ${styles.blueBorder}`}>
        <p>{data.suggestion}</p>
      </div>

      <div className={styles.feedbackSection}>
        <AnimatePresence mode="wait">
          {feedbackSubmitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.feedbackConfirmation}
            >
              Bedankt voor je feedback!
            </motion.div>
          ) : (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', gap: '24px' }}
            >
              <button className={`${styles.iconButton} ${styles.likeButton} ${feedback === 'liked' ? styles.liked : ''}`} onClick={() => handleFeedbackClick('liked')} title="Ik vind dit goed">
                <FiThumbsUp />
              </button>
              <button className={`${styles.iconButton} ${styles.dislikeButton} ${feedback === 'disliked' ? styles.disliked : ''}`} onClick={() => handleFeedbackClick('disliked')} title="Ik vind dit niet goed">
                <FiThumbsDown />
              </button>
              <button className={`${styles.iconButton} ${styles.dice}`} onClick={() => alert('Nieuwe suggestie!')} title="Nieuwe suggestie">
                <IoReload />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LessonPlan;