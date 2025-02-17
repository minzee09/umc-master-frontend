import Typography from '@components/common/typography';
import styled from 'styled-components';
import mainCharacter from '@assets/mainCharacter.png';
import { useState } from 'react';
import CloseIcon from '@assets/icons/x.svg?react';
import { useQuizStore } from '@store/quizStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizList } from '@apis/queries/useQuizQueries';
import { usePostQuizAnswer } from '@apis/queries/useQuizMutations';

enum QuizStep {
  CHARACTER,
  QUIZ,
  RESULT,
}

const QuizBox: React.FC = () => {
  const [step, setStep] = useState<QuizStep>(QuizStep.CHARACTER);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { data: quizData, /*isFetching,*/ error } = useQuizList();
  const postQuizAnswer = usePostQuizAnswer();

  const { hideQuiz } = useQuizStore();

  const handleCharacterClick = () => {
    setStep(QuizStep.QUIZ);
  };

  const handleAnswerClick = async (answer: number) => {
    const quiz = quizData?.result?.response.quiz_list[0];
    if (!quiz) return;
    console.log('quiz ID', quiz.id);

    setUserAnswer(answer);
    setUserSelectedOption(answer ? 'O' : 'X');

    const isCorrect = answer === quiz.answer;

    if (isCorrect) {
      try {
        await postQuizAnswer.mutateAsync({
          quizId: quiz.id,
          isCorrect: true,
        });
      } catch (error) {
        console.error('Failed to submit quiz answer:', error);
      }
    }
    setStep(QuizStep.RESULT);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      hideQuiz();
    }
  };

  // if (!quizData) return <div>퀴즈 데이터가 없습니다.</div>;

  // if (isFetching) return <div>로딩중</div>;

  if (error) return <div>Error</div>;

  const quiz = quizData?.result?.response.quiz_list[0];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionContainer
          key="quiz-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onAnimationComplete={handleAnimationComplete}
        >
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {step === QuizStep.CHARACTER && (
              <MotionContentWrapper>
                <StyledTypography color="white" variant="headingXxSmall">
                  오늘의 QUIZ를 맞혀보세요!
                </StyledTypography>
                <Card onClick={handleCharacterClick} role="button">
                  <Image src={mainCharacter} />
                </Card>
              </MotionContentWrapper>
            )}

            {step === QuizStep.QUIZ && (
              <MotionContentWrapper>
                <TodayQuizDiv>
                  <Typography variant="headingXxxSmall">오늘의 Quiz</Typography>
                </TodayQuizDiv>
                <QuizDescription>
                  <Typography variant="titleXxSmall">{quiz?.question}</Typography>
                </QuizDescription>
                <ButtonContainer>
                  <QuizButton disabled={postQuizAnswer.isPending} onClick={() => handleAnswerClick(1)}>
                    <Typography variant="headingMedium">O</Typography>
                  </QuizButton>
                  <QuizButton disabled={postQuizAnswer.isPending} onClick={() => handleAnswerClick(0)}>
                    <Typography variant="headingMedium">X</Typography>
                  </QuizButton>
                </ButtonContainer>
              </MotionContentWrapper>
            )}

            {step === QuizStep.RESULT && (
              <MotionContentWrapper>
                <ResultTextDiv>
                  <Typography variant="headingXxSmall">
                    {userAnswer === quiz?.answer ? '정답이에요!' : '틀렸습니다. 아쉽네요ㅠㅠ'}
                  </Typography>
                </ResultTextDiv>
                <QuizButton>
                  <Typography variant="headingMedium">{userSelectedOption}</Typography>
                </QuizButton>
                <DescriptionText>
                  <Typography variant="bodyMedium">{quiz?.description}</Typography>
                </DescriptionText>
              </MotionContentWrapper>
            )}
          </motion.div>

          <CloseBTN onClick={handleClose}>
            <CloseIcon />
          </CloseBTN>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default QuizBox;

const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.text['white']};
`;

const MotionContainer = styled(motion.div)`
  position: relative;
  width: 1280px;
  height: 320px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  text-align: center;
  margin: 0 auto;
  margin-top: 100px;
  padding-top: 45px;
`;

const MotionContentWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseBTN = styled.button`
  position: absolute;
  top: 48px;
  right: 60px;
  color: ${({ theme }) => theme.colors.text['white']};
  background: none;
  border: none;
  cursor: pointer;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[700]};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 220px;
  margin: 0 auto;
`;

const Image = styled.img`
  object-fit: contain;
`;

const TodayQuizDiv = styled.div`
  color: ${({ theme }) => theme.colors.text['white']};
  margin-top: 15px;
  margin-bottom: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 176px;
`;

const QuizButton = styled.button`
  padding: 0px 61px;
  background: white;
  color: ${({ theme }) => theme.colors.primary[900]};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const ResultTextDiv = styled.div`
  color: ${({ theme }) => theme.colors.text['white']};
  margin-bottom: 18px;
`;

const QuizDescription = styled.div`
  color: ${({ theme }) => theme.colors.text['white']};
  margin-bottom: 44px;
`;

const DescriptionText = styled.div`
  margin-top: 25px;
  color: ${({ theme }) => theme.colors.text['white']};
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  padding: 0 238px;
`;
