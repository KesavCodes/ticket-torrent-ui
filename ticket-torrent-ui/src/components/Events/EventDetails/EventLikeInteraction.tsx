import { useMutation } from "@tanstack/react-query";
import { queryClient, updateLikeStatus } from "../../../utils/https";
import { useState } from "react";

import filledHeartLogo from "../../../assets/event-card/like/filledHeart.png";
import emptyHeartLogo from "../../../assets/event-card/like/emptyHeart.png";
import { useNavigate } from "react-router-dom";
const EventLikeInteraction = ({ fav, id }: { fav: boolean; id: string }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(fav);

  const { mutate } = useMutation({
    mutationFn: (eventId: string) => updateLikeStatus({ eventId }),
    onMutate: () => {
      setIsLiked((prevState) => !prevState);
    },
    onError: (error) => {
      const errorObj: { message: string; code: number } = JSON.parse(
        error.message
      );
      // revert the mutation
      if (errorObj.code === 400) navigate("/auth");
      setIsLiked((prevState) => !prevState);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["events", { max: 5 }] }),
  });
  return (
    <img
      src={isLiked ? filledHeartLogo : emptyHeartLogo}
      alt="favorite"
      className="w-full h-4 cursor-pointer"
      onClick={() => mutate(id)}
    />
  );
};

export default EventLikeInteraction;
