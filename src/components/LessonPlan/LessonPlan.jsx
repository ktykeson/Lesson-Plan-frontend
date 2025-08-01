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


const MOCK_DATA = {
    positiveInsights: [
        { type: 'student_increase', icon: FiTrendingUp, text: 'Good news! Student Tesse improved her score by 30%, showing great progress on Fractions.' },
        { type: 'student_increase', icon: FiTrendingUp, text: 'Fantastic work from Raúl, who has mastered the concepts he struggled with last week.' },
        { type: 'student_increase', icon: FiTrendingUp, text: 'Kevin and Charlotte both achieved a perfect score on the latest quiz!' }
    ],
    initialInsights: [
        { type: 'class', icon: HiOutlineUserGroup, text: 'The class has the same mistakes on Q1 and Q2.', subtext: 'This is a recurring pattern from last week.', isAlert: true },
        { type: 'group', icon: FiUsers, text: 'Students Nicole, Anh, and Noah have 4 overlapping incorrect answers for Q1, Q2, Q3, Q4, Q5, Q6.', isAlert: true },
        { type: 'student_decrease', icon: FiUser, text: 'Student Enrico decreased their performance from 80% correct answers last week to 50% this week.',  isAlert: true },
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
        analysis: "The results show that there is a low level of correctness per question within the class. Paragraph 1 scores an average of 80%, compared to 70% on the specific questions Q1, Q2, and Q3.",
        suggestion: "Go over Q1, Q2, and Q3 with the whole class to provide targeted feedback on these low-scoring areas."
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
    const handleBackToRegenerated = () => setView('regenerated');
    
    return (
        <Card>
            <div className={styles.heroSection}>
                {view === 'detail' && (
                     <button onClick={handleBackToRegenerated} className={styles.backButton}>
                        <FiChevronLeft />
                    </button>
                )}
                <h1 className={styles.heroTitle}>Jouw Lesplan</h1>
            </div>
            
            <div className={styles.contentArea}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {view === 'initial' && <InitialView otherInsights={MOCK_DATA.initialInsights} positiveInsights={MOCK_DATA.positiveInsights} />}
                        {view === 'regenerated' && <RegeneratedView planItems={MOCK_DATA.regeneratedPlan} onShowDetail={handleShowDetail} />}
                        {view === 'detail' && <DetailView data={MOCK_DATA.detailItem} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {(view === 'initial' || view === 'regenerated') && (
                 <div className={styles.footerAction}>
                    <button onClick={handleToggleView} className={styles.regenerateButton} disabled={isLoading}>
                        {isLoading ? <Spinner /> : <FiBook />}
                        {isLoading ? 'Processing...' : (view === 'initial' ? 'Regenerate Plan' : 'Back to Initial Insights')}
                    </button>
                </div>
            )}
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


const InitialView = ({ otherInsights, positiveInsights }) => (
    <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className={styles.listContainer}>
        
        {otherInsights.map((item, index) => (
            <motion.div key={index} variants={listItemVariants}>
                <div 
                    className={`${styles.listItemPanel} ${styles.clickable}`}
                    onClick={() => alert("Showing details for this insight...")}
                >
                    <item.icon className={styles.icon} />
                    <div className={styles.textContainer}>
                        {item.text}
                        {item.subtext && <div className={styles.subtext}>{item.subtext}</div>}
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


// --- START OF THE CHANGED COMPONENT ---
const DetailView = ({ data }) => {
    const [feedback, setFeedback] = useState(null);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const handleFeedbackClick = (type) => {
        setFeedback(type);
        setFeedbackSubmitted(true);
    };

    return (
        <div className={styles.detailContainer}>
            <div className={styles.chartsWrapper}>
                {/* 2. USE the new MuiPieChart component */}
                <MuiPieChart 
                    percentage={data.avgCorrectP1} 
                    label="Average Correct % Paragraph 1" 
                    value={`${data.avgCorrectP1}% correct`} 
                />
                <MuiPieChart 
                    percentage={data.avgCorrectQ123} 
                    label="Average Correct % Q1, Q2, Q3" 
                    value={`${data.avgCorrectQ123}% correct`} 
                />
            </div>
            <div className={`${styles.textBox} ${styles.orangeBorder}`}>
                <p>{data.analysis}</p>
            </div>
            <div className={`${styles.textBox} ${styles.blueBorder}`}>
                <p>{data.suggestion}</p>
            </div>
            <div className={styles.feedbackSection}>
                <AnimatePresence mode="wait">
                {feedbackSubmitted ? (
                    <motion.div key="thanks" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={styles.feedbackConfirmation}>
                        Thank you for your feedback!
                    </motion.div>
                ) : (
                    <motion.div key="buttons" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} style={{display: 'flex', gap: '24px'}}>
                        <button className={`${styles.iconButton} ${styles.likeButton} ${feedback === 'liked' ? styles.liked : ''}`} onClick={() => handleFeedbackClick('liked')} title="I like this">
                            <FiThumbsUp />
                        </button>
                        <button className={`${styles.iconButton} ${styles.dislikeButton} ${feedback === 'disliked' ? styles.disliked : ''}`} onClick={() => handleFeedbackClick('disliked')} title="I dislike this">
                            <FiThumbsDown />
                        </button>
                        <button className={`${styles.iconButton} ${styles.dice}`} onClick={() => alert('Rerolling suggestions!')} title="Get new suggestion">
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