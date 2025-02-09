/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from './image.png';

// 더미 댓글 생성 함수
export const generateComments = (numberOfComments: number) => {
  const authors = [
    "홍길동", "김철수", "박지은", "이수정", "최민우", "윤소라", "정하늘", "김지민", "송우빈", "장윤호"
  ];

  const comments = [
    "이 꿀팁 너무 유용해요! 감사합니다.",
    "와, 이런 정보 처음 알았네요.",
    "정말 도움이 되는 내용이에요!",
    "저도 해봤는데 정말 효과가 있더라구요!",
    "다음에도 이런 팁 부탁드려요!",
    "이 방법 덕분에 많은 시간을 절약했어요.",
    "친구에게 공유해야겠어요.",
    "이 꿀팁 덕분에 생활이 편해졌어요.",
    "정말 고마워요. 자주 확인할게요.",
    "이런 팁을 주셔서 감사합니다.",
    "해본 결과 정말 유용했어요.",
    "이 팁 덕분에 일이 더 쉬워졌어요.",
    "저도 이 방법을 사용해봤어요!",
    "좋은 팁이에요. 너무 유용했어요.",
    "정말 감사합니다! 덕분에 시간 절약했어요.",
    "이 팁 덕분에 좀 더 효율적으로 살고 있어요.",
    "이건 정말 누구에게나 필요한 꿀팁 같아요.",
    "너무 좋은 정보에요. 항상 기대됩니다.",
    "이거 진짜 꿀팁! 꼭 따라해보세요.",
    "이 팁을 참고해서 생활이 훨씬 좋아졌어요.",
    "이 방법 정말 추천합니다. 편리해요.",
    "이건 좀 더 많이 알려져야 할 팁인 것 같아요.",
    "여러 번 시도해봤는데 계속 효과적이에요.",
    "정말 도움이 많이 됐어요. 감사합니다.",
    "이 방법을 모르고 있었네요. 정말 좋네요!",
    "이 팁 덕분에 일상 생활이 편리해졌어요.",
    "오늘부터 이 팁을 활용해봐야겠어요.",
    "이 팁 너무 좋아요. 완전 추천합니다.",
    "정말 많은 도움이 되었어요. 감사합니다.",
    "이 팁 정말 유용하네요. 친구에게도 알려줄게요."
  ];

  return Array.from({ length: numberOfComments }, (_, _index) => {
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}.0${currentDate.getMonth() + 1}.${String(currentDate.getDate()).padStart(2, '0')}`;
    const time = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    return {
      author: randomAuthor,
      date: date,
      time: time,
      comment: randomComment,
    };
  });
};



export const dummyData = Array.from({ length: 1000 }, (_, index) => ({
  id: (index + 1).toString(),
  image: Image,
  text: [
    "자취생을 위한 꿀팁",
    "청소 쉽게 하는 방법",
    "절약 꿀팁 3가지",
    "요리 초보를 위한 레시피",
    "시간 절약하는 생활 팁",
  ][index % 5],
  likes: Math.floor(Math.random() * 5000) + 1000, // 1000~6000 사이 랜덤 값
  bookmarks: Math.floor(Math.random() * 5000) + 1000, // 1000~6000 사이 랜덤 값
  date: `2025.01.${String((index % 30) + 1).padStart(2, '0')}`,
}));

interface SaveTipDetail {
    id: string;
    image: string;
    title: string;
    author: string;
    bestnum: number;
    date: string;
    time: string;
    tags: string[];
    description: string;
    comments: { author: string; date: string; time: string; comment: string }[]; // 댓글 데이터 추가
  }

export const saveTipDetailPageDataList: SaveTipDetail[] = [
  {
    id: "1",
    image: "https://via.placeholder.com/150",
    title: "코딩 실력 향상 방법",
    author: "TechGuru22",
    bestnum: 15,
    date: "2025.02.01",
    time: "14:30",
    tags: ["코딩", "프로그래밍", "개발"],
    description: "코딩 실력을 향상시키려면 꾸준한 연습과 새로운 알고리즘을 배우는 것이 중요합니다. 하나의 언어를 마스터하고...",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "2",
    image: "https://via.placeholder.com/150",
    title: "효율적인 시간 관리 비법",
    author: "TimeMaster",
    bestnum: 22,
    date: "2025.02.02",
    time: "09:00",
    tags: ["시간관리", "생산성", "습관"],
    description: "시간 관리는 성공적인 삶의 핵심입니다. 중요한 일부터 우선순위를 정하고, 할 일 목록을 작성하세요.",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "3",
    image: "https://via.placeholder.com/150",
    title: "자기계발을 위한 책 추천",
    author: "BookLover",
    bestnum: 30,
    date: "2025.02.03",
    time: "18:15",
    tags: ["책추천", "자기계발", "독서"],
    description: "자기계발을 위한 최고의 책 5권을 소개합니다. 이 책들은 마음가짐과 목표 설정에 큰 도움이 될 것입니다.",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "4",
    image: "https://via.placeholder.com/150",
    title: "효율적인 공부법",
    author: "StudyExpert",
    bestnum: 18,
    date: "2025.02.04",
    time: "11:45",
    tags: ["공부법", "집중력", "학습"],
    description: "효율적인 공부법은 집중력과 시간 관리를 포함합니다. 여러 가지 방법을 시도하며 자신에게 맞는 방법을 찾는 것이 중요합니다.",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "5",
    image: "https://via.placeholder.com/150",
    title: "건강을 위한 운동 루틴",
    author: "FitLife",
    bestnum: 10,
    date: "2025.02.05",
    time: "07:30",
    tags: ["운동", "건강", "피트니스"],
    description: "건강을 유지하려면 일주일에 3번, 30분씩 운동하는 것이 이상적입니다. 유산소 운동과 근력 운동을 번갈아 하세요.",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "6",
    image: "https://via.placeholder.com/150",
    title: "스트레스 해소 방법",
    author: "RelaxTime",
    bestnum: 25,
    date: "2025.02.06",
    time: "16:00",
    tags: ["스트레스", "명상", "힐링"],
    description: "스트레스를 해소하는 다양한 방법이 있습니다. 명상, 운동, 혹은 취미 생활을 통해 스트레스를 관리하세요.",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "7",
    image: "https://via.placeholder.com/150",
    title: "효과적인 커뮤니케이션 기술",
    author: "CommuPro",
    bestnum: 20,
    date: "2025.02.07",
    time: "12:00",
    tags: ["커뮤니케이션", "대화", "소통"],
    description: "좋은 커뮤니케이션은 성공적인 팀워크와 관계를 만듭니다. 경청과 명확한 표현이 중요합니다.",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "8",
    image: "https://via.placeholder.com/150",
    title: "경제적 자유를 위한 팁",
    author: "WealthBuilder",
    bestnum: 12,
    date: "2025.02.08",
    time: "19:30",
    tags: ["재테크", "투자", "경제"],
    description: "경제적 자유를 얻으려면 재정 관리를 철저히 하고, 장기적인 투자 계획을 세워야 합니다.",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "9",
    image: "https://via.placeholder.com/150",
    title: "창의력 향상을 위한 팁",
    author: "CreativeMind",
    bestnum: 35,
    date: "2025.02.09",
    time: "08:00",
    tags: ["창의력", "아이디어", "혁신"],
    description: "창의력을 키우는 가장 좋은 방법은 다양한 경험을 쌓고, 새로운 아이디어에 열린 마음을 갖는 것입니다.",
    comments: generateComments(30), // 댓글 추가
  },
  {
    id: "10",
    image: "https://via.placeholder.com/150",
    title: "미래를 준비하는 방법",
    author: "FutureReady",
    bestnum: 28,
    date: "2025.02.10",
    time: "21:00",
    tags: ["미래준비", "계획", "목표설정"],
    description: "미래를 준비하려면 지금부터 자산 관리, 학습, 그리고 꾸준한 목표 설정이 필요합니다.",
    comments: generateComments(30), // 댓글 추가
  }
];