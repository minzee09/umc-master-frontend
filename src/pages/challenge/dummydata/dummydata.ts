/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from '@assets/dummyImage/clean.png';

// 더미 댓글 생성 함수
export const generateComments = (numberOfComments: number) => {
  const authors = [
    "홍길동", "김철수", "박지은", "이수정", "최민우", "윤소라", "정하늘", "김지민", "송우빈", "장윤호"
  ];

  const comments = [
    "쓰레기 버리기 챌린지에 참여하며 작은 공동체의 힘을 느꼈어요! 환경을 위해 더 노력해야겠습니다.",
    "재활용 챌린지 덕분에 자원의 소중함을 다시 한번 깨달았어요. 앞으로 더 신경 써서 분리배출할게요.",
    "플라스틱 줄이기 챌린지를 통해 일회용품 사용을 줄일 수 있는 방법을 많이 배웠어요.",
    "이웃들과 함께하는 환경 보호 챌린지, 생각보다 재미있고 유익했어요. 함께 하면 더 큰 힘이 되네요!",
    "이번 '에너지 절약' 챌린지를 통해 전기 절약의 중요성을 느꼈습니다. 더 많은 사람이 실천했으면 좋겠어요.",
    "도시 숲 가꾸기 챌린지에 참여하면서 자연의 소중함을 새삼 느꼈어요. 이 활동을 통해 환경 보호에 동참하고 있어요.",
    "미세먼지 줄이기 챌린지를 통해 내 주변 환경에 대한 책임감을 더 느꼈어요. 앞으로도 지속적으로 실천할 거예요.",
    "그린 에너지 사용 챌린지를 시작하면서 친환경 에너지에 대한 관심이 더욱 생겼어요. 작은 변화부터 시작해볼게요.",
    "길거리 청소 챌린지 참여로 나 혼자만이 아닌 공동체로 힘을 합쳐 환경을 개선하는 기쁨을 느꼈어요.",
    "환경 보호 활동을 지속적으로 이어가면 정말 세상이 조금씩 더 나아질 수 있다는 확신이 들어요.",
    "자원 낭비를 줄이기 위한 챌린지를 통해 새로운 생활 습관을 익히고 있어요. 정말 의미있는 경험입니다.",
    "친환경 쇼핑 챌린지를 하면서 일회용 포장재를 줄이고, 지구를 생각하는 마음이 더 커졌어요.",
    "친구들과 함께하는 ‘제로 웨이스트’ 챌린지, 처음엔 어려웠지만 점점 더 재미있어지네요!",
    "물 절약 챌린지 참여 후, 작은 실천으로도 큰 변화를 만들 수 있다는 걸 깨달았어요. 계속 이어갈 거예요.",
    "자전거 타기 챌린지 덕분에 운동도 하고, 탄소 배출도 줄일 수 있어서 기분이 좋았어요. 다른 사람도 함께 했으면 좋겠어요.",
    "환경을 생각한 소비 챌린지를 통해 물건을 사는 방법에 대해 다시 한 번 생각하게 되었어요. 자주 실천할게요.",
    "쓰레기 줄이기 챌린지 참여 후, 나도 할 수 있다는 자신감이 생겼어요. 모두가 함께 노력하면 큰 변화를 만들 수 있을 것 같아요.",
    "이 환경 보호 챌린지를 통해 자연의 소중함을 다시 한번 깨닫게 되었어요. 나만의 작은 실천을 계속해 나갈 거예요.",
    "해양 플라스틱 쓰레기 줄이기 챌린지 덕분에 해양 생태계 보호에 대해 관심이 더 생겼어요. 모두가 실천해야 해요.",
    "플라스틱 없는 하루 챌린지 덕분에 조금씩 변화가 생겼어요. 더 나은 미래를 위해 계속 실천할게요!",
    "환경을 위한 작은 실천, 정말 중요하다는 것을 이번 챌린지를 통해 알게 되었습니다. 더 많은 사람들이 참여했으면 좋겠어요.",
    "에너지 절약 챌린지 덕분에 불필요한 에너지 소비를 줄이고 더 효율적으로 사용하려는 노력이 생겼어요.",
    "이번 챌린지 덕분에 생활 속 작은 변화가 큰 차이를 만든다는 걸 알게 되었어요. 환경을 위해 계속 노력할게요."
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
    "플라스틱 제대로 분리배출하는 방법",
    "음식물 쓰레기 제대로 처리하는 법",
    "종이 분리배출 제대로 하기",
    "매일 10분! 효율적인 집 청소법",
    "유리병 분리배출, 어떻게 할까요?",
    "옷 정리와 기부, 환경을 위한 작은 실천",
    "전자제품 폐기물, 올바르게 처리하는 방법",
  ][index % 5],
  likes: Math.floor(Math.random() * 5000) + 1000, // 1000~6000 사이 랜덤 값
  bookmarks: Math.floor(Math.random() * 5000) + 1000, // 1000~6000 사이 랜덤 값
  date: `2025.01.${String((index % 30) + 1).padStart(2, '0')}`,
}));

interface Hashtag {
  hashtag_id: number;
  name: string;
}

interface Media {
  media_url: string;
  media_type: string;
}
interface User {
  user_id: number;
  nickname: string;
  profile_image_url: string | null;
}

export interface TipItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
  media: Media[];
  hashtags: { hashtag: Hashtag }[];
  user: User;
  _count: {
    likes: number;
    saves: number;
  };
  comments: { author: string; date: string; time: string; comment: string }[]; // 댓글 데이터 추가
}

export const ChallengeDetailPageDataList: TipItem[] = [
  {
    id: '1',
    media: [{ media_url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAxMjBfMzkg%2FMDAxNzM3MzM0NzAwMzky.lhLzVUx9LD4TXcSWtJr-7kFaGdM25zxUioUvsgUH0qcg.YgdfJ9jO-6JnJ-d-ILSbyyfVbYwL_fql_NLKDOkUHBAg.JPEG%2F20250120_095507.jpg&type=sc960_832", media_type: "image" }],
    title: "플라스틱 제대로 분리배출하는 방법",
    content: "플라스틱을 분리배출할 때는 라벨을 제거하고 깨끗이 씻어야 합니다. 또한 색깔별로 나누어 배출하면 더욱 효율적인 재활용이 가능합니다.",
    created_at: "2025-02-01T10:30:00Z",
    hashtags: [
      { hashtag: { hashtag_id: 1, name: "재활용/분리수거" } },
      { hashtag: { hashtag_id: 2, name: "성공시 1,000pt" } },
    ],
    user: { user_id: 101, nickname: "EcoWarrior", profile_image_url: null },
    _count: { likes: 12, saves: 5 },
    comments: generateComments(50),
  },
  {
    id: '2',
    media: [{ media_url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAxMjBfMzkg%2FMDAxNzM3MzM0NzAwMzky.lhLzVUx9LD4TXcSWtJr-7kFaGdM25zxUioUvsgUH0qcg.YgdfJ9jO-6JnJ-d-ILSbyyfVbYwL_fql_NLKDOkUHBAg.JPEG%2F20250120_095507.jpg&type=sc960_832", media_type: "image" }],
    title: "음식물 쓰레기 제대로 처리하는 법",
    content: "음식물 쓰레기를 줄이려면 잔반을 최소화하고, 껍질이나 뼈는 따로 분리해 처리해야 합니다. 음식물 건조기도 활용해보세요!",
    created_at: "2025-02-02T08:45:00Z",
    hashtags: [
      { hashtag: { hashtag_id: 4, name: "음식물쓰레기" } },
      { hashtag: { hashtag_id: 5, name: "성공시 1,500pt" } },
    ],
    user: { user_id: 102, nickname: "GreenChef", profile_image_url: null },
    _count: { likes: 8, saves: 3 },
    comments: generateComments(30),
  },
  {
    id: '3',
    media: [{ media_url: "https://via.placeholder.com/150", media_type: "image" }],
    title: "종이 분리배출 제대로 하기",
    content: "종이류를 분리배출할 때는 코팅된 종이와 일반 종이를 구분해야 합니다. 깨끗한 종이는 재활용이 가능하지만, 오염된 종이는 일반 쓰레기로 버려야 합니다.",
    created_at: "2025-02-03T12:20:00Z",
    hashtags: [
      { hashtag: { hashtag_id: 7, name: "재활용/분리수거" } },
      { hashtag: { hashtag_id: 8, name: "성공시 1,000pt" } },
    ],
    user: { user_id: 103, nickname: "PaperSaver", profile_image_url: null },
    _count: { likes: 15, saves: 7 },
    comments: generateComments(40),
  },
  {
    id: '4',
    media: [{ media_url: "https://via.placeholder.com/150", media_type: "image" }],
    title: "매일 10분! 효율적인 집 청소법",
    content: "하루 10분씩 청소 시간을 정해두면, 집이 항상 깔끔하게 유지됩니다. 각 방을 요일별로 나누어 청소하는 것도 좋은 방법입니다.",
    created_at: "2025-02-04T09:10:00Z",
    hashtags: [
      { hashtag: { hashtag_id: 10, name: "청소" } },
      { hashtag: { hashtag_id: 11, name: "성공시 1,000pt" } },
    ],
    user: { user_id: 104, nickname: "CleanFreak", profile_image_url: null },
    _count: { likes: 18, saves: 9 },
    comments: generateComments(60),
  },
  {
    id: '5',
    media: [{ media_url: "https://via.placeholder.com/150", media_type: "image" }],
    title: "유리병 분리배출, 어떻게 할까요?",
    content: "유리병을 분리할 때는 내용물을 완전히 비우고 헹궈야 합니다. 또한 깨진 유리는 일반 쓰레기로 배출해야 합니다.",
    created_at: "2025-02-05T14:50:00Z",
    hashtags: [
      { hashtag: { hashtag_id: 13, name: "재활용/분리수거" } },
      { hashtag: { hashtag_id: 14, name: "성공시 1,000pt" } },
    ],
    user: { user_id: 105, nickname: "RecycleKing", profile_image_url: null },
    _count: { likes: 10, saves: 4 },
    comments: generateComments(20),
  },
  {
    id: '6',
    media: [{ media_url: "https://via.placeholder.com/150", media_type: "image" }],
    title: "옷 정리와 기부, 환경을 위한 작은 실천",
    content: "입지 않는 옷을 기부하면 환경 보호에 기여할 수 있습니다. 재사용이 어려운 옷은 천 조각으로 만들어 활용할 수도 있어요.",
    created_at: "2025-02-06T11:30:00Z",
    hashtags: [
      { hashtag: { hashtag_id: 16, name: "재활용/분리수거" } },
      { hashtag: { hashtag_id: 17, name: "성공시 2,000pt" } },
    ],
    user: { user_id: 106, nickname: "UpcycleLover", profile_image_url: null },
    _count: { likes: 20, saves: 11 },
    comments: generateComments(70),
  },
  {
    id: '7',
    media: [{ media_url: "https://via.placeholder.com/150", media_type: "image" }],
    title: "전자제품 폐기물, 올바르게 처리하는 방법",
    content: "버려야 할 전자제품은 수거함을 이용해야 합니다. 배터리와 본체는 따로 분리해 배출하는 것이 중요합니다.",
    created_at: "2025-02-07T16:00:00Z",
    hashtags: [
      { hashtag: { hashtag_id: 19, name: "재활용/분리수거" } },
      { hashtag: { hashtag_id: 20, name: "성공시 3,000pt" } },
    ],
    user: { user_id: 107, nickname: "TechRecycler", profile_image_url: null },
    _count: { likes: 25, saves: 15 },
    comments: generateComments(80),
  }
];

