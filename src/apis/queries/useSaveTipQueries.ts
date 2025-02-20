import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedTips } from "@apis/tipApi";

export const useSaveTipList = () => {
  return useInfiniteQuery({
    queryKey: ["savedTips"],
    queryFn: () => getSavedTips(),
    initialPageParam: 1, 
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });
};
